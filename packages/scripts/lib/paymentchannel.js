const xrpl = require("xrpl");
const { Base } = require("./base");

class PaymentChannel extends Base {

    constructor(url) {
        super(url);
    }

    createChannel = async (sender, amount, Destination) => {
        const wallet = xrpl.Wallet.fromSeed(sender)

        const json = {
            Account: wallet.address,
            Amount: "" + BigInt(amount) * 1000000n,
            Destination,
            PublicKey: wallet.publicKey,
            SettleDelay: 0,
            TransactionType: "PaymentChannelCreate"
        }

        const response = await this.client.submitAndWait(json, {
            wallet
        })
        return response
    }

    claim = async (recipient, channelId, publicKey, amount, balance, signature) => {

        const recipientWallet = xrpl.Wallet.fromSeed(recipient)

        const json = {
            Account: recipientWallet.address,
            Channel: channelId,
            Amount: amount,
            Balance: balance,
            PublicKey: publicKey,
            Signature: signature,
            TransactionType: "PaymentChannelClaim"
        }

        const response = await this.client.submit(json, {
            wallet: recipientWallet
        })
        return response
    }

    closeChannel = async (sender, channelId) => {

        const wallet = xrpl.Wallet.fromSeed(sender)

        const json = {
            Account: wallet.address,
            TransactionType: "PaymentChannelClaim",
            Channel : channelId,
            Flags: xrpl.PaymentChannelClaimFlags.tfClose
        }

        const response = await this.client.submitAndWait(json, {
            wallet
        })
        return response
    }

    listChannels = async (account, destination) => {

        const param = {
            account,
            destination_account: destination,
            command: "account_channels"
        }

        const { result } = await this.client.request(param)

        return result.channels
    }

    sign = (channelId, payer, amount) => {
        const wallet = xrpl.Wallet.fromSeed(payer)
        return xrpl.authorizeChannel(wallet, channelId, amount) // 0.1
    }

    verify = (channelId, amount, signature, secret) => {
        const wallet = xrpl.Wallet.fromSeed(secret)
        return xrpl.verifyPaymentChannelClaim(channelId, amount, signature, wallet.publicKey)
    }



}

exports.PaymentChannel = PaymentChannel