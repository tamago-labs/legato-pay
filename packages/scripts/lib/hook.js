const xrpl = require("xrpl");

class Hook {

    client

    constructor(url) {
        this.client = new xrpl.Client(url)
    }

    connect = async () => {
        await this.client.connect()
    }

    secretToAddress = (secret) => {
        const wallet = xrpl.Wallet.fromSeed(secret)
        return wallet.address
    }

    process = async (sender, amount, recipient) => {
        const wallet = xrpl.Wallet.fromSeed(sender)

        const json = {
            Account: wallet.address,
            TransactionType: "Payment",
            Amount: "" + amount,
            Destination: recipient,
            Fee: "100000"
        }

        const response = await this.client.submitAndWait(json, {
            wallet
        })

        return response
    }

    disconnect = () => {
        this.client.disconnect()
    }

}

exports.Hook = Hook