const chai = require('chai')
const { MultiSig } = require("../lib/multisig")

const { expect } = chai

const SERVER_URL = "wss://xahau-test.net"

const MASTER_SECRET = "snhK9rGnf2P7M3cwKpWnmt64tWGDM"

const ALICE_SECRET = "snDtACryn2YiCjHwXiW1GnVm4qJZ3"
const BOB_SECRET = "shRsM1jmLfvzuKAiCpYDvegQbXySe"
const CHARLIE_SECRET = "shkHZAZ1d4EByWqbKUfpBJUQXRBfF"

describe('#multisig', function () {

    let multisig

    beforeEach(async () => {
        multisig = new MultiSig(SERVER_URL)
        await multisig.connect()
    });

    // it('make a multi-signature wallet success ', async () => { 
    //     const { result } = await multisig.createWallet( MASTER_SECRET, [ALICE_SECRET, BOB_SECRET, CHARLIE_SECRET] )
    //     expect(result.meta.TransactionResult).to.equal("tesSUCCESS")     
    // })

    it('list wallet address success ', async () => { 
        
        const wallets = await multisig.listWallet( MASTER_SECRET )

        expect(wallets[0].SignerEntries.length).to.equal(3)
        expect(wallets[0].SignerQuorum).to.equal(3)
    })

    // it('send 1 XRP from multi-sig to Alice success ', async () => { 
        
    //     await multisig.send( MASTER_SECRET, [ALICE_SECRET, BOB_SECRET, CHARLIE_SECRET] )

    // })

    afterEach(function () {
        multisig.disconnect()
    });

})