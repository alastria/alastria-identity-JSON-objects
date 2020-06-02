var describe = require('mocha').describe
var expect = require('chai').expect;
const vendors = require('./vendors');
const validators = require('./validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var presentationRequestSchema = require('./validators/presentationRequests/presentationRequest-json-schema.json');
var sessionSchema = require('./validators/sessions/session-json-schema.json')
var presentationSchema = require('./validators/presentations/presentations-json-schema.json');
var alastriaIdCreationSchema = require('./validators/alastriaIdCreations/alastriaIdCreation-json-schema.json');
var { tests } = require('./tests')

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
        describe(vendor.name, () => {
            vendor.dids.forEach(didObject => {
                var keysDIDs = Object.keys(didObject);
                keysDIDs.forEach(keyDID => {
                    describe("Testing DIDs: " + didObject[keyDID], () => {
                        tests.dids.validateDID(didObject[keyDID]);
                    });
                });
            });
            

            vendor.credentials.forEach(credentialObject => {
                var keyCredential = Object.keys(credentialObject);
                var credentialAsBase64 = credentialObject[keyCredential];

                describe("Testing Credential: " + credentialAsBase64, () => {
                    tests.credentials.validateCredential(credentialAsBase64);
                });
            });

            describe("Testing alastria tokens with JSON Schemas", () => {
                vendor.tokens.forEach(tokenObject => {
                    var keyToken = Object.keys(tokenObject);
                    var tokenAsBase64 = tokenObject[keyToken];

                    describe("Testing Token: " + tokenAsBase64, () => {
                        tests.tokens.validateToken(tokenAsBase64);
                    });
                });
            });

            describe("Testing alastria sessions with JSON Schemas", () => {
                vendor.sessions.forEach(sessionObject => {
                    var keySession = Object.keys(sessionObject);
                    var sessionAsBase64 = sessionObject[keySession];

                    describe("Testing Session: " + sessionAsBase64, () => {
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

                        it('Property @CONTEXT of the decoded payload should be a valid URL', function () {
                            expect(validators.sessions.shouldPropertyCONTEXTInDecodedPayloadBeAValidURL(decodedSession), "Property '@context' inside decoded payload should be a valid URL").to.be.true;
                        });

                        it('Property DATA of the decoded payload should be a valid JWT structure', function () {
                            expect(validators.sessions.isDATAValidForAlastria(decodedSession), "Property 'data' inside decoded payload should be a valid JWT structure").to.be.true;
                        });

                    });

                });
            });

            describe("Testing alastria presentation with JSON Schemas", () => {
                vendor.presentations.forEach(tokenObject => {
                    var keyToken = Object.keys(tokenObject);
                    var tokenAsBase64 = tokenObject[keyToken];

                    describe("Testing Presentation: " + tokenAsBase64, () => {
                        it('Presentation should exist', function () {
                            expect(validators.presentations.shouldExist(tokenAsBase64), "Presentation should exist").to.be.true;
                        });

                        it('Presentation should be a valid JWT structure', function () {
                            expect(validators.presentations.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(tokenAsBase64), "It should follow the structure string.string.string").to.be.true;
                        });

                        var decodedToken = jwt.decode(tokenAsBase64, {complete: true});

                        it('Validate schema of the Presentation ' + decodedToken, () => {
                            expect(decodedToken).to.be.jsonSchema(presentationSchema);
                        });

                        it('Property procUrl of the decoded payload should be a valid URL', function () {
                            expect(validators.presentations.shouldPropertyPROCURLInDecodedPayloadBeAValidURL(decodedToken), "Property 'procUrl' inside decoded payload should be a valid URL").to.be.true;
                        });

                    });
                });
            });

        });

        describe("Testing alastria Presentation Request with JSON Schemas", () => {
            vendor.presentationRequests.forEach(presentationRequestObject => {
                var keyPresentationRequest = Object.keys(presentationRequestObject);
                var presentationRequestAsBase64 = presentationRequestObject[keyPresentationRequest];

                describe("Testing Presentation Request: " + presentationRequestAsBase64, () => {
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
                });
            });
        });

        describe("Testing Alastria ID Creation with JSON Schemas", () => {
            vendor.alastriaIdCreations.forEach(alastriaIdCreationObject => {
                var keyAlastriaIdCreation = Object.keys(alastriaIdCreationObject);
                var alastriaIdCreationAsBase64 = alastriaIdCreationObject[keyAlastriaIdCreation];

                describe("Testing Alastria ID Creation: " + alastriaIdCreationAsBase64, () => {
                    it('Alastria ID Creation should exist', function () {
                        expect(validators.alastriaIdCreations.shouldExist(alastriaIdCreationAsBase64), "Alastris ID Creation should exist").to.be.true;
                    });

                    it('Alastria ID Creation should be a valid JWT structure', function () {
                        expect(validators.alastriaIdCreations.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(alastriaIdCreationAsBase64), "It should follow the structure string.string.string").to.be.true;
                    });

                    var decodedAlastriaIdCreation = jwt.decode(alastriaIdCreationAsBase64, {complete: true});

                    it('Validate schema of the Alastria ID Creation ' + decodedAlastriaIdCreation, () => {
                        expect(decodedAlastriaIdCreation).to.be.jsonSchema(alastriaIdCreationSchema);
                    });

                    it('Property ALASTRIATOKEN of the decoded payload should be a valid JWT structure', function () {
                        expect(validators.alastriaIdCreations.isALASTRIATOKENValidForAlastria(decodedAlastriaIdCreation), "Property 'alastriaToken' inside decoded payload should be a valid JWT structure").to.be.true;
                    });
                });
            });
        });

    });

});