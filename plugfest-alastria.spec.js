var describe = require('mocha').describe
var expect = require('chai').expect;
const vendors = require('./vendors');
const validators = require('./validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
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
                        tests.sessions.validateSession(sessionAsBase64);
                    });
                });
            });

            describe("Testing alastria presentation with JSON Schemas", () => {
                vendor.presentations.forEach(presentationObject => {
                    var keyPresentation = Object.keys(presentationObject);
                    var presentationAsBase64 = presentationObject[keyPresentation];

                    describe("Testing Presentation: " + presentationAsBase64, () => {
                        tests.presentations.validatePresentation(presentationAsBase64);
                    });
                });
            });

        });

        describe("Testing alastria Presentation Request with JSON Schemas", () => {
            vendor.presentationRequests.forEach(presentationRequestObject => {
                var keyPresentationRequest = Object.keys(presentationRequestObject);
                var presentationRequestAsBase64 = presentationRequestObject[keyPresentationRequest];

                describe("Testing Presentation Request: " + presentationRequestAsBase64, () => {
                    tests.presentationRequests.validatePresentationRequest(presentationRequestAsBase64);
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