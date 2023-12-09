import * as aws from "@pulumi/aws";
import { DynamoDBClient, GetItemCommand, QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

const parseBody = (event: any) => {
    let { body, isBase64Encoded } = event

    if (isBase64Encoded === true) {
        const base64String = body
        const buff = Buffer.from(base64String, "base64");
        const eventBodyStr = buff.toString("utf-8")
        body = JSON.parse(eventBodyStr);
    } else {
        body = JSON.parse(body);
    }
    return body
}


export const getMerchants = async (event: any, tableName: any) => {

    console.log("EVENT: \n" + JSON.stringify(event, null, 2))

    try {

        const input = {
            "TableName": tableName,
            "KeyConditionExpression": "chain = :chain and account BETWEEN :from AND :to",
            "ExpressionAttributeValues": {
                ":chain": {
                    "S": "testnet"
                },
                ":from": {
                    "S": "1"
                },
                ":to": {
                    "S": "z"
                }
            },
            "ProjectionExpression": "chain, account, wallets"
        };

        const client = new DynamoDBClient()

        const command = new QueryCommand(input);
        const { Items } = await client.send(command);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: "ok",
                merchants: Items
            }),
        }

    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: "error",
                message
            }),
        }
    }

}

export const addWallet = async (event: any, tableName: any) => {

    console.log("EVENT: \n" + JSON.stringify(event, null, 2))

    try {

        const body = parseBody(event)

        console.log("BODY: \n", body)
        const { chain, account } = body

        if (chain !== "testnet") {
            throw new Error("Chain is not support")
        }

        let params = {
            TableName: tableName,
            Key: {
                "chain": {
                    "S": chain
                },
                "account": {
                    "S": account
                }
            }
        };

        const client = new DynamoDBClient()
        const command = new GetItemCommand(params);

        const { Item } = await client.send(command)

        if (!Item) {

            const { merchantName, merchantAddress, jurisdiction, masterAddress, signerAddresses, duty } = body

            const payload = {
                "TableName": tableName,
                "Item": {
                    "chain": {
                        "S": chain
                    },
                    "account": {
                        "S": account
                    },
                    "merchantName": {
                        "S": merchantName
                    },
                    "wallets": {
                        "S": JSON.stringify([{
                            merchantName,
                            merchantAddress,
                            jurisdiction,
                            masterAddress,
                            signerAddresses,
                            duty
                        }
                        ])
                    }
                }
            }

            const command = new PutItemCommand(payload);
            await client.send(command);

        } else {

            const { merchantName, merchantAddress, jurisdiction, masterAddress, signerAddresses, duty } = body

            const existWalletData = JSON.parse(Item.wallets.S || JSON.stringify([]))

            const newWalletData = [{
                merchantName,
                merchantAddress,
                jurisdiction,
                masterAddress,
                signerAddresses,
                duty
            }].concat(existWalletData)

            const payload = {
                "TableName": tableName,
                "Item": {
                    "chain": {
                        "S": chain
                    },
                    "account": {
                        "S": account
                    },
                    "merchantName": {
                        "S": merchantName
                    },
                    "wallets": {
                        "S": JSON.stringify(newWalletData)
                    }
                }
            }

            const command = new PutItemCommand(payload);
            await client.send(command);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: "ok"
            }),
        }

    } catch (error) {

        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: "error",
                message
            }),
        }
    }

}

export const addClaim = async (event: any, tableName: any) => {

    console.log("EVENT: \n" + JSON.stringify(event, null, 2))

    try {

        const body = parseBody(event)

        console.log("BODY: \n", body)
        const { chain, channelId } = body

        if (chain !== "testnet") {
            throw new Error("Chain is not support")
        }

        let params = {
            TableName: tableName,
            Key: {
                "chain": {
                    "S": chain
                },
                "channelId": {
                    "S": channelId
                }
            }
        };

        const client = new DynamoDBClient()
        const command = new GetItemCommand(params);

        const { Item } = await client.send(command)

        if (!Item) {

            const { signature, amount } = body

            const payload = {
                "TableName": tableName,
                "Item": {
                    "chain": {
                        "S": chain
                    },
                    "channelId": {
                        "S": channelId
                    },
                    "claims": {
                        "S": JSON.stringify([{
                            signature,
                            amount,
                            timestamp: new Date().valueOf()
                        }
                        ])
                    }
                }
            }

            const command = new PutItemCommand(payload);
            await client.send(command);

        } else {

            const { signature, amount } = body

            const existData = JSON.parse(Item.claims.S || JSON.stringify([]))

            const newData = [{
                signature,
                amount,
                timestamp: new Date().valueOf()
            }].concat(existData)

            const payload = {
                "TableName": tableName,
                "Item": {
                    "chain": {
                        "S": chain
                    },
                    "channelId": {
                        "S": channelId
                    },
                    "claims": {
                        "S": JSON.stringify(newData)
                    }
                }
            }

            const command = new PutItemCommand(payload);
            await client.send(command);

        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: "ok"
            }),
        }

    } catch (error) {

        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: "error",
                message
            }),
        }
    }

}

export const getClaim = async (event: any, tableName: any) => {

    console.log("EVENT: \n" + JSON.stringify(event, null, 2))

    try {

        if (event && event.pathParameters) {

            const query = event.pathParameters.proxy

            let params = {
                TableName: tableName,
                Key: {
                    "chain": {
                        "S": "testnet"
                    },
                    "channelId": {
                        "S": query
                    }
                }
            };

            const client = new DynamoDBClient()
            const command = new GetItemCommand(params);

            const { Item } = await client.send(command)

            if (Item) {

                const claims = JSON.parse(Item.claims.S || JSON.stringify([]))

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        status: "ok",
                        claims
                    }),
                }
            } else {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        status: "ok",
                        claims: []
                    }),
                }
            }

        }

        throw new Error("Invalid channel ID")

    } catch (error) {

        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: "error",
                message
            }),
        }
    }

}