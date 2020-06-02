var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var credentialSchema = require('../../validators/credentials/credential-json-schema.json');

require('../commons');

function validateCredential(credentialAsBase64) {
    it('Credential should exist', function () {
        expect(validators.credentials.shouldExist(credentialAsBase64), "Credential should exist").to.be.true;
    });

    it('Credential should be a valid JWT structure', function () {
        expect(validators.credentials.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credentialAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedCredential = jwt.decode(credentialAsBase64, {complete: true});

    it('Validate schema of the credential against credential-json-schema.json' + decodedCredential, () => {
        expect(decodedCredential).to.be.jsonSchema(credentialSchema);
    });

    it('Property @context inside vc should have an URL in the first item', function () {
        expect(validators.credentials.shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credentialObject[keyCredential]), "Property '@context' should be an array with an URL in the first index").to.be.true;
    });

    it('Property type inside vc should be an array with \'VerifiableCredential\' as the first item of the array', function () {
        expect(validators.credentials.shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credentialObject[keyCredential]), "Property 'type' inside property vc in decoded payload should be an array with 'VerifiableCredential' as the first item").to.be.true;
    });
}

const credentialTest = {
    "validateCredential": validateCredential
}

module.exports = credentialTest;