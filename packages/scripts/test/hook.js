const chai = require('chai');
const { Hook } = require('../lib/hook');

const { expect } = chai

const SERVER_URL = "wss://xahau-test.net"
const SECRET = "shRsM1jmLfvzuKAiCpYDvegQbXySe"
const AMOUNT = 100
const RECIPIENT_ADDRESS = "rwYk7hPgA5JBx3dXAyvX2KF6iaDVhWofS6"

describe('#hook', function () {

    let hook

    beforeEach(async () => {
        hook = new Hook(SERVER_URL)
        await hook.connect()
    });

    it('transfers 100 XRP success ', async () => {

        const { id, result } = await hook.process(SECRET, AMOUNT, RECIPIENT_ADDRESS)

        expect(id > 0).to.true
        expect(result.Account).to.equal(hook.secretToAddress(SECRET))
        expect(result.Destination).to.equal(RECIPIENT_ADDRESS)
        expect(result.meta["delivered_amount"]).to.equal(`${AMOUNT}`)    
    })

    afterEach(function () {
        hook.disconnect()
    });

})      