import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

import { getMerchants, addWallet, addClaim, getClaim } from "./routes"

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

const legatoClaimTable = new aws.dynamodb.Table(
    "legatoClaimTable",
    {
        attributes: [
            {
                name: "chain",
                type: "S"
            },
            {
                name: "channelId",
                type: "S"
            }
        ],
        hashKey: "chain",
        rangeKey: "channelId",
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
        },
        {
            method: "POST",
            path: "/claim",
            eventHandler: new aws.lambda.CallbackFunction("addClaim", {
                memorySize: 256,
                callback: async (event) => await addClaim(event, legatoClaimTable.name.get()),
            })
        },
        {
            method: "GET",
            path: "/claim/{proxy+}",
            eventHandler: new aws.lambda.CallbackFunction("getClaim", {
                callback: async (event) => await getClaim(event, legatoClaimTable.name.get())
            })
        },
    ]
})

export const legatoPayApi = endpoint.url;