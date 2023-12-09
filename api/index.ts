import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

import { getMerchants, addWallet } from "./routes"

const legatoPayTable = new aws.dynamodb.Table(
    "legatoPayTable",
    {
        attributes: [
            {
                name: "chain",
                type: "S"
            },
            {
                name: "account",
                type: "S"
            }
        ],
        hashKey: "chain",
        rangeKey: "account",
        billingMode: "PAY_PER_REQUEST"
    }
)

const endpoint = new awsx.classic.apigateway.API("legatopay-api", {
    routes: [
        {
            path: "/merchants",
            method: "GET",
            eventHandler: new aws.lambda.CallbackFunction("getMerchants", {
                callback: async (event) => await getMerchants(event, legatoPayTable.name.get()),
            })
        },
        {
            method: "POST",
            path: "/wallet",
            eventHandler: new aws.lambda.CallbackFunction("listWallet", {
                memorySize: 256,
                callback: async (event) => await addWallet(event, legatoPayTable.name.get()),
            })
        }
    ]
})

export const legatoPayApi = endpoint.url;