var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var presentationRequestSchema = require('../../validators/presentationRequests/presentationRequest-json-schema.json');

require('../commons');

function validatePresentationRequest(presentationRequestAsBase64) {
    it('Presentation Request should exist', function () {
        expect(validators.presentationRequests.shouldExist(presentationRequestAsBase64), "Presentation Request should exist").to.be.true;
    });

    it('Token should be a valid JWT structure', function () {
        expect(validators.presentationRequests.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(presentationRequestAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedPresentationRequest = jwt.decode(presentationRequestAsBase64, {complete: true});

    it('Validate schema of the Presentation Request ' + decodedPresentationRequest, () => {
        expect(decodedPresentationRequest).to.be.jsonSchema(presentationRequestSchema);
    });

    it('Property CBU of the decoded payload should be a valid URL', function () {
        expect(validators.presentationRequests.shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedPresentationRequest), "Property 'cbu' inside decoded payload should be a valid URL").to.be.true;
    });
}

const presentationRequestTest = {
    "validatePresentationRequest": validatePresentationRequest
}

module.exports = presentationRequestTest;