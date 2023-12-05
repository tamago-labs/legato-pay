const chai = require('chai');
const { Starter } = require('../lib/starter');

const { expect } = chai

const SERVER_URL = "wss://xahau-test.net"
const SECRET = "shRsM1jmLfvzuKAiCpYDvegQbXySe"
const AMOUNT = 100
const RECIPIENT_ADDRESS = "rwYk7hPgA5JBx3dXAyvX2KF6iaDVhWofS6"

describe('#starter', function () {

    let starter

    beforeEach(async () => {
        starter = new Starter(SERVER_URL)
        await starter.connect()
    });

    it('transfers 100 XRP success ', async () => {

        const { id, result } = await starter.process(SECRET, AMOUNT, RECIPIENT_ADDRESS)

        expect(id > 0).to.true
        expect(result.Account).to.equal(starter.secretToAddress(SECRET))
        expect(result.Destination).to.equal(RECIPIENT_ADDRESS)
        expect(result.meta["delivered_amount"]).to.equal(`${AMOUNT}`)    
    })

    afterEach(function () {
        starter.disconnect()
    });

})      