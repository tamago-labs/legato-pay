const xrpl = require("xrpl");
const { Base } = require("./base");

class MultiSig extends Base {

    constructor(url) {
        super(url);
    }

    createWallet = async (master, secretList = []) => {

        const wallet = xrpl.Wallet.fromSeed(master)

        const json = {
            Account: wallet.address,
            SignerQuorum: 3,
            TransactionType: "SignerListSet",
            SignerEntries: secretList.map((item, index) => ({
                SignerEntry: {
                    Account: this.secretToAddress(item),
                    SignerWeight: index === 0 ? 2 : 1
                }
            }))
        }

        const response = await this.client.submitAndWait(json, {
            wallet
        })
        return response
    }

    listWallet = async (account) => {

        const param = {
            account: this.secretToAddress(account),
            command: "account_objects"
        }

        const { result } = await this.client.request(param)
        return result.account_objects.filter(item => item.LedgerEntryType === "SignerList")
    }

    send = async (master, secretList = []) => {

        // TODO

        const json = {
            TransactionType: 'Payment',
            Account: wallet.address,
            Destination: this.secretToAddress(secretList[0]),
            Amount: '1000000'
        }

       

    }

}

exports.MultiSig = MultiSig