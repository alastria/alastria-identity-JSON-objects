var describe = require('mocha').describe
var expect = require('chai').expect;
const vendors = require('./vendors');
const validators = require('./validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var tokenSchema = require('./validators/tokens/token-json-schema.json');
var credentialSchema = require('./validators/credentials/credential-json-schema.json');
var presentationSchema = require('./validators/presentations/presentations-json-schema.json');

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
        describe(vendor.name, () => {

            vendor.dids.forEach(didObject => {
                var keysDIDs = Object.keys(didObject);

                keysDIDs.forEach(keyDID => {
                    describe("Testing DIDs: " + didObject[keyDID], () => {
                        it('did should exist', function() {
                            expect(validators.did.shouldExist(didObject[keyDID]), "Did does not exist").to.be.true;
                        });

                        it('did should start with did:', function() {
                            expect(validators.did.shouldStartWithDID(didObject[keyDID]), "Did does not start with characters 'did'").to.be.true;
                        });

                        it('did should start "ala" as identifier', function() {
                            expect(validators.did.shouldHaveAlaAsIdentifier(didObject[keyDID]), "Did should have 'ala' as identifier").to.be.true;
                        });

                        it('did should start "quor" or "fabr" as network', function() {
                            expect(validators.did.shouldHaveQuorOrFabrAsNetwork(didObject[keyDID]), "Did should have 'quor' or 'fabr' as network").to.be.true;
                        });

                        it('did should have hex in proxyAddress', function() {
                            expect(validators.did.shouldProxyAddressBeHexadecimal(didObject[keyDID]), "Did should have a valid hex value as proxy address").to.be.true;
                        });
                    });
                });
            });

            vendor.credentials.forEach(credentialObject => {
                var keyCredential = Object.keys(credentialObject);
                var credentialAsBase64 = credentialObject[keyCredential];

                describe("Testing Credential: " + credentialAsBase64, () => {
                    it('Credential should exist', function() {
                        expect(validators.credentials.shouldExist(credentialAsBase64), "Credential should exist").to.be.true;
                    });

                    it('Credential should be a valid JWT structure', function() {
                        expect(validators.credentials.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credentialAsBase64), "It should follow the structure string.string.string").to.be.true;
                    });

                    var decodedCredential = jwt.decode(credentialAsBase64, { complete: true });

                    it('Validate schema of the credential against credential-json-schema.json' + decodedCredential, () => {
                        expect(decodedCredential).to.be.jsonSchema(credentialSchema);
                    });

                    it('Property @context inside vc should have an URL in the first item', function() {
                        expect(validators.credentials.shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credentialObject[keyCredential]), "Property '@context' should be an array with an URL in the first index").to.be.true;
                    });

                    it('Property type inside vc should be an array with \'VerifiableCredential\' as the first item of the array', function() {
                        expect(validators.credentials.shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credentialObject[keyCredential]), "Property 'type' inside property vc in decoded payload should be an array with 'VerifiableCredential' as the first item").to.be.true;
                    });
                });
            });

            describe("Testing alastria tokens with JSON Schemas", () => {
                vendor.tokens.forEach(tokenObject => {
                    var keyToken = Object.keys(tokenObject);
                    var tokenAsBase64 = tokenObject[keyToken];

                    describe("Testing Token: " + tokenAsBase64, () => {
                        it('Token should exist', function() {
                            expect(validators.tokens.shouldExist(tokenAsBase64), "Token should exist").to.be.true;
                        });

                        it('Token should be a valid JWT structure', function() {
                            expect(validators.tokens.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(tokenAsBase64), "It should follow the structure string.string.string").to.be.true;
                        });

                        var decodedToken = jwt.decode(tokenAsBase64, { complete: true });

                        it('Validate schema of the token against token-json-schema.json' + decodedToken, () => {
                            expect(decodedToken).to.be.jsonSchema(tokenSchema);
                        });

                        it('Property GWU of the decoded payload should be a valid URL', function() {
                            expect(validators.tokens.shouldPropertyGWUInDecodedPayloadBeAValidURL(decodedToken), "Property 'gwu' inside decoded payload should be a valid URL").to.be.true;
                        });

                        it('Property CBU of the decoded payload should be a valid URL', function() {
                            expect(validators.tokens.shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedToken), "Property 'cbu' inside decoded payload should be a valid URL").to.be.true;
                        });
                    });
                });
            });

            describe("Testing alastria presentation with JSON Schemas", () => {
                vendor.presentations.forEach(tokenObject => {
                    var keyToken = Object.keys(tokenObject);
                    var tokenAsBase64 = tokenObject[keyToken];

                    describe("Testing Presentation: " + tokenAsBase64, () => {
                        it('Presentation should exist', function() {
                            expect(validators.presentations.shouldExist(tokenAsBase64), "Presentation should exist").to.be.true;
                        });

                        it('Presentation should be a valid JWT structure', function() {
                            expect(validators.presentations.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(tokenAsBase64), "It should follow the structure string.string.string").to.be.true;
                        });

                        var decodedToken = jwt.decode(tokenAsBase64, { complete: true });

                        it('Validate schema of the Presentation ' + decodedToken, () => {
                            expect(decodedToken).to.be.jsonSchema(presentationSchema);
                        });

                        it('Property procUrl of the decoded payload should be a valid URL', function() {
                            expect(validators.presentations.shouldPropertyPROCURLInDecodedPayloadBeAValidURL(decodedToken), "Property 'procUrl' inside decoded payload should be a valid URL").to.be.true;
                        });

                    });
                });
            });

        });
    });
});