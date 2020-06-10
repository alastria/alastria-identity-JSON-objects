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

    it('Property ALASTRIATOKEN of the decoded payload should be a valid JWT structure', function () {
        expect(validators.sessions.isATValidForAlastria(decodedSession), "Property 'alastriaToken' inside decoded payload should be a valid JWT structure").to.be.true;
    });
}

const sessionTest = {
    "validateSession": validateSession
}

module.exports = sessionTest;