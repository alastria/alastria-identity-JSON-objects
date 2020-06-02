var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
//require('commons');

function validateDID(did) {
    it('did should exist', function () {
        expect(validators.did.shouldExist(did), "Did does not exist").to.be.true;
    });

    it('did should start with did:', function () {
        expect(validators.did.shouldStartWithDID(did), "Did does not start with characters 'did'").to.be.true;
    });

    it('did should have "ala" as identifier', function () {
        expect(validators.did.shouldHaveAlaAsIdentifier(did), "Did should have 'ala' as identifier").to.be.true;
    });

    it('did should have "quor" or "fabr" or "besu" as network', function () {
        expect(validators.did.shouldHaveQuorOrFabrOrBesuAsNetwork(did), "Did should have 'quor' or 'fabr' or 'besu' as network").to.be.true;
    });

    it('did should have a valid string in proxyAddress', function () {
        expect(validators.did.shouldProxyAddressBeValidString(did), "Did should have a valid string as proxy address").to.be.true;
    });
}

const didTest = {
    "validateDID": validateDID
}

module.exports = didTest;