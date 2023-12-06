const chai = require('chai')
const { PaymentChannel } = require("../lib/paymentchannel")

const { expect } = chai

const SERVER_URL = "wss://xahau-test.net"
const PAYER_SECRET = "shkHZAZ1d4EByWqbKUfpBJUQXRBfF"
const AMOUNT = 1
const RECIPIENT_SECRET = "snDtACryn2YiCjHwXiW1GnVm4qJZ3"


describe('#paymentChannel', function () {

    let channel

    beforeEach(async () => {
        channel = new PaymentChannel(SERVER_URL)
        await channel.connect()
    });

    it('create a payment channel success ', async () => {

        const { id, result } = await channel.createChannel(PAYER_SECRET, AMOUNT, channel.secretToAddress( RECIPIENT_SECRET ) )

        expect(id > 0).to.true
        expect(result.Amount).to.equal("1000000")
        expect(result.Destination).to.equal(channel.secretToAddress( RECIPIENT_SECRET ))
        expect(result.TransactionType).to.equal("PaymentChannelCreate")    
    })

    it('send 0.1 XRP via all active channels success', async () => {

        const channels = await channel.listChannels(channel.secretToAddress(PAYER_SECRET), channel.secretToAddress(RECIPIENT_SECRET))

        let signatures = []

        for (let item of channels) {
            const { channel_id } = item
            const signature = channel.sign(channel_id, PAYER_SECRET, "100000") // 0.1 XRP

            // verify
            expect(channel.verify(channel_id, "0.1", signature, PAYER_SECRET)).to.true

            signatures.push({
                signature,
                ...item
            })
        }

        // recipient claims XRP tokens

        for (let item of signatures) {
            const { signature, channel_id, balance, public_key_hex } = item
            
            const { result } = await channel.claim(
                RECIPIENT_SECRET,
                channel_id,
                public_key_hex,
                "100000", // 0.1
                `${Number(balance) + 100000}`,
                signature
            )
            // expect( result.engine_result).to.equal("tesSUCCESS")
        }

    })

    it('close all active channels success ', async () => {

        const channels = await channel.listChannels( channel.secretToAddress( PAYER_SECRET ) , channel.secretToAddress( RECIPIENT_SECRET ))

        for (let item of channels) {
            
            const { result } = await channel.closeChannel(PAYER_SECRET, item.channel_id)

            expect(result.TransactionType).to.equal("PaymentChannelClaim")
            expect(result.meta.TransactionResult).to.equal("tesSUCCESS")     
        }

    })

    afterEach(function () {
        channel.disconnect()
    });

})      