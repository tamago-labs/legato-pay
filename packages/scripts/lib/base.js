const xrpl = require("xrpl");

class Base {

    client

    constructor(url) {
        this.client = new xrpl.Client(url)
    }

    connect = async () => {
        await this.client.connect()
    }

    disconnect = () => {
        this.client.disconnect()
    }

    secretToAddress = (secret) => {
        const wallet = xrpl.Wallet.fromSeed(secret)
        return wallet.address
    }

}

exports.Base = Base