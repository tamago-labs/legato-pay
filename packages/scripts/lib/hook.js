const xrpl = require("xrpl");
const { Base } = require("./base");

class Hook extends Base {

    constructor(url) {
        super(url);
    }

    send = async (sender, amount, recipient) => {
        const wallet = xrpl.Wallet.fromSeed(sender)

        const json = {
            Account: wallet.address,
            TransactionType: "Payment",
            Amount: "" + BigInt(amount) * 1000000n,
            Destination: recipient,
            Fee: "100000"
        }

        const response = await this.client.submitAndWait(json, {
            wallet
        })

        return response
    }

}

exports.Hook = Hook