var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var presentationSchema = require('../../validators/presentations/presentations-json-schema.json');

require('../commons');

function validatePresentation(presentationAsBase64) {
    it('Presentation should exist', function () {
        expect(validators.presentations.shouldExist(presentationAsBase64), "Presentation should exist").to.be.true;
    });

    it('Presentation should be a valid JWT structure', function () {
        expect(validators.presentations.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(presentationAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedToken = jwt.decode(presentationAsBase64, {complete: true});

    it('Validate schema of the Presentation ' + decodedToken, () => {
        expect(decodedToken).to.be.jsonSchema(presentationSchema);
    });

    it('Property procUrl of the decoded payload should be a valid URL', function () {
        expect(validators.presentations.shouldPropertyPROCURLInDecodedPayloadBeAValidURL(decodedToken), "Property 'procUrl' inside decoded payload should be a valid URL").to.be.true;
    });
}

const presentationTest = {
    "validatePresentation": validatePresentation
}

module.exports = presentationTest;