import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"
import { Client, Wallet } from "xrpl"

import { ACCOUNTS, SERVER_URL, API_URL } from "../constants"

import axios from "axios"

export const PayContext = createContext()

const Provider = ({ children }) => {

    const client = new Client(SERVER_URL)

    const [values, dispatch] = useReducer(
        (curVal, newVal) => ({ ...curVal, ...newVal }),
        {
            account: ACCOUNTS[0],
            balance: 0,
            merchant: undefined
        }
    )

    const { account, balance, merchant } = values

    const updateAccount = (account) => {
        dispatch({ account })
    }

    useEffect(() => {
        updateBalance(account)
    }, [account])

    const updateBalance = useCallback(async ({ address }) => {

        if (!client.isConnected()) {
            await client.connect()
        }

        const balance = await client.getXrpBalance(address)
        dispatch({ balance: Number(balance) })
    }, [client])

    const listMerchants = useCallback(async () => {
        const { address } = account
        const { data } = await axios.get(`${API_URL}/merchants`)
        const filtered = data.merchants.filter(item => item.account.S === address)
        return filtered.length > 0 ? JSON.parse(filtered[0].wallets.S) : []
    }, [account])

    const listAllMerchants = async () => {
        const { data } = await axios.get(`${API_URL}/merchants`)
        return data.merchants.map(item => (JSON.parse(item.wallets.S))).reduce((arr, item) => {
            return arr.concat(item)
        }, [])
    }

    const generateNewWallet = useCallback(async () => {
        // if (!client.isConnected()) {
        //     await client.connect()
        // }
        // const { wallet } = await client.fundWallet()
        const { data } = await axios.post("https://xahau-test.net/accounts")
        return data.account
    }, [])

    const setupMultisig = useCallback(async (walletJson) => {

        if (!client.isConnected()) {
            await client.connect()
        }

        const wallet = Wallet.fromSeed(walletJson.secret)

        console.log("recovered : ", wallet)

        const json = {
            Account: wallet.address,
            SignerQuorum: 3,
            TransactionType: "SignerListSet",
            SignerEntries: ACCOUNTS.slice(0, 3).map((item, index) => ({
                SignerEntry: {
                    Account: item.address,
                    SignerWeight: index === 0 ? 2 : 1
                }
            }))
        }

        console.log("json : ", json)

        await client.submit(json, {
            wallet
        })

    }, [client])

    const openChannel = useCallback(async (amount, Destination) => {

        if (!client.isConnected()) {
            await client.connect()
        }

        const { secret } = account

        const wallet = Wallet.fromSeed(secret)

        const json = {
            Account: wallet.address,
            Amount: "" + BigInt(amount) * 1000000n,
            Destination,
            PublicKey: wallet.publicKey,
            SettleDelay: 0,
            TransactionType: "PaymentChannelCreate"
        }

        await client.submitAndWait(json, {
            wallet
        })

    }, [account, client])

    const listChannels = useCallback(async (destination) => {

        if (!client.isConnected()) {
            await client.connect()
        }

        const { address } = account

        const param = {
            account: address,
            destination_account: destination,
            command: "account_channels"
        }

        const { result } = await client.request(param)
        return result.channels

    }, [client, account])

    const sendToApi = useCallback(async ({
        merchantName,
        merchantAddress,
        jurisdiction,
        duty,
        masterAddress
    }) => {

        const signerAddresses = ACCOUNTS.slice(0, 3).map(item => item.address)

        console.log("send payload to cache server..")

        const { data } = await axios.post(`/api`, {
            chain: "testnet",
            account: account.address,
            merchantName,
            merchantAddress,
            jurisdiction,
            duty,
            masterAddress,
            signerAddresses
        })

        return data.status === "ok"
    }, [account])

    const setMerchant = (merchant) => {
        dispatch({ merchant })
    }

    const payContext = useMemo(
        () => ({
            account,
            accounts: ACCOUNTS,
            updateAccount,
            balance,
            generateNewWallet,
            setupMultisig,
            sendToApi,
            listMerchants,
            merchant,
            listAllMerchants,
            openChannel,
            listChannels,
            setMerchant
        }),
        [
            account,
            balance,
            generateNewWallet,
            setupMultisig,
            sendToApi,
            listMerchants,
            merchant,
            openChannel,
            listChannels
        ]
    )

    return (
        <PayContext.Provider value={payContext}>
            {children}
        </PayContext.Provider>
    )
}

export default Provider