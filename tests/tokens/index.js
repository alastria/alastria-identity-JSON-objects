var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var tokenSchema = require('../../validators/tokens/token-json-schema.json');

require('../commons');

function validateToken(tokenAsBase64) {
    it('Token should exist', function () {
        expect(validators.tokens.shouldExist(tokenAsBase64), "Token should exist").to.be.true;
    });

    it('Token should be a valid JWT structure', function () {
        expect(validators.tokens.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(tokenAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedToken = jwt.decode(tokenAsBase64, {complete: true});

    it('Validate schema of the token against token-json-schema.json' + decodedToken, () => {
        expect(decodedToken).to.be.jsonSchema(tokenSchema);
    });

    it('Property GWU of the decoded payload should be a valid URL', function () {
        expect(validators.tokens.shouldPropertyGWUInDecodedPayloadBeAValidURL(decodedToken), "Property 'gwu' inside decoded payload should be a valid URL").to.be.true;
    });

    it('Property CBU of the decoded payload should be a valid URL', function () {
        expect(validators.tokens.shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedToken), "Property 'cbu' inside decoded payload should be a valid URL").to.be.true;
    });
}

const tokenTest = {
    "validateToken": validateToken
}

module.exports = tokenTest;