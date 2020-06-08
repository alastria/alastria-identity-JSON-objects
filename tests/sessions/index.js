var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var sessionSchema = require('../../validators/sessions/session-json-schema.json')

require('../commons');

function validateSession(sessionAsBase64) {
    it('Session should exist', function () {
        expect(validators.sessions.shouldExist(sessionAsBase64), "Session should exist").to.be.true;
    });

    it('Session should be a valid JWT structure', function () {
        expect(validators.sessions.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(sessionAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedSession = jwt.decode(sessionAsBase64, {complete: true});

    it('Validate schema of the session ' + decodedSession, () => {
        expect(decodedSession).to.be.jsonSchema(sessionSchema);
    });

    it('Property @CONTEXT of the decoded payload should contain "https://alastria.github.io/identity/artifacts/v1"', function () {
        expect(validators.sessions.isCONTEXTValidForAlastria(decodedSession), "Property '@context' array inside decoded payload should contain at least one 'https://alastria.github.io/identity/artifacts/v1'").to.be.true;
    });

    it('Property TYPE of the decoded payload should contain "AlastriaSession"', function () {
        expect(validators.sessions.isTYPEValidForAlastria(decodedSession), "Property 'type' array inside decoded payload should contain at least one 'AlastriaSession'").to.be.true;
    });

    it('Property ALASTRIATOKEN of the decoded payload should be a valid JWT structure', function () {
        expect(validators.sessions.isATValidForAlastria(decodedSession), "Property 'alastriaToken' inside decoded payload should be a valid JWT structure").to.be.true;
    });
}

const sessionTest = {
    "validateSession": validateSession
}

module.exports = sessionTest;