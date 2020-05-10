var describe = require('mocha').describe
var expect = require('chai').expect;
const vendors = require('./vendors');
const validators = require('./validators')

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
      describe(vendor.name, () => {
        
        vendor.dids.forEach(didObject => {
          var keysDIDs = Object.keys(didObject);
          
          keysDIDs.forEach(keyDID => {
            describe("Testing DIDs: " + didObject[keyDID], () => {
              it('did should exist', function () {
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

          describe("Testing Credential: " + credentialObject[keyCredential], () => {
            it('credential should exist', function () {
              expect(validators.credentials.shouldExist(credentialObject[keyCredential]), "Credential should exist").to.be.true;
            });

            it('credential should be a valid JWT structure', function () {
              expect(validators.credentials.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credentialObject[keyCredential]), "It should follow the structure string.string.string").to.be.true;
            });

            it('Decoded header should be a valid JSON', function() {
              expect(validators.credentials.shouldDecodedHeaderBeAValidJSON(credentialObject[keyCredential]), "Header is not a valid JSON once it is decoded").to.be.true;
            });

            it('Decoded payload should be a valid JSON', function() {
              expect(validators.credentials.shouldDecodedPayloadBeAValidJSON(credentialObject[keyCredential]), "Payload is not a valid JSON once it is decoded").to.be.true;
            });

            describe("Testing Payload: ", function() {
              it('Decoded signature should be a valid JSON', function() {
                expect(validators.credentials.shouldDecodedSignatureBeAValidJSON(credentialObject[keyCredential]), "Signature is not a valid JSON once it is decoded").to.be.true;
              });

              it('Kid inside decoded header should be a valid DID for Alastria', function() {
                expect(validators.credentials.shouldKidInsideDecodedHeaderBeAValidDIDForAlastria(credentialObject[keyCredential]), "Kid inside header is not valid for Alastria").to.be.true;
              });
            });

            describe("Testing Payload: ", function() {
              it('Property ISS of the decoded payload is required', function() {
                expect(validators.credentials.shouldPropertyISSInDecodedPayloadExist(credentialObject[keyCredential]), "Property 'iss' inside decoded payload is required").to.be.true;
              });

              it('Property ISS of the decoded payload should be a valid Alastria DID', function() {
                expect(validators.credentials.shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(credentialObject[keyCredential]), "Property 'iss' inside decoded payload should be a valid Alastria DID").to.be.true;
              });

              it('Property SUB of the decoded payload if exists, should be a valid Alastria DID', function() {
                expect(validators.credentials.shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists(credentialObject[keyCredential]), "Property 'sub' inside decoded payload should be a valid Alastria DID if exists").to.be.true;
              });

              it('Property IAT of the decoded payload is required', function() {
                expect(validators.credentials.shouldPropertyIATInDecodedPayloadExist(credentialObject[keyCredential]), "Property 'iat' inside decoded payload is required").to.be.true;
              });

              it('Property IAT of the decoded payload should be a valid number representing an epoch date', function() {
                expect(validators.credentials.shouldPropertyIATInDecodedPayloadBeAValidJSONDate(credentialObject[keyCredential]), "Property 'iat' inside decoded payload should be a number representing an EPOCH date").to.be.true;
              });

              it('Property EXP of the decoded payload should be a valid number representing an epoch date if exists', function() {
                expect(validators.credentials.shouldPropertyEXPInDecodedPayloadBeAValidJSONDateIfExists(credentialObject[keyCredential]), "Property 'exp' inside decoded payload should be a number representing an EPOCH date if exists").to.be.true;
              });

              it('Property NBF of the decoded payload should be a valid number representing an epoch date if exists', function() {
                expect(validators.credentials.shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists(credentialObject[keyCredential]), "Property 'nbf' inside decoded payload should be a number representing an EPOCH date if exists").to.be.true;
              });

              describe("Testing VC Property: ", function() {
                it('Property VC of the decoded payload is required', function() {
                  expect(validators.credentials.shouldPropertyVCInDecodedPayloadExist(credentialObject[keyCredential]), "Property 'vc' inside decoded payload is required").to.be.true;
                });

                it('Property @context inside vc of the decoded payload is required', function() {
                  expect(validators.credentials.shouldContextInVCInDecodedPayloadExist(credentialObject[keyCredential]), "Property '@context' inside property vc in decoded payload is required").to.be.true;
                });

                it('Property @context inside vc should be an array with two elements', function() {
                  expect(validators.credentials.shouldContextInVCInDecodedPayloadBeAnArrayWithTwoElements(credentialObject[keyCredential]), "Property '@context' should be an array with two elements").to.be.true;
                });

                it('Property @context inside vc should have an URL in the first item', function() {
                  expect(validators.credentials.shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credentialObject[keyCredential]), "Property '@context' should be an array with an URL in the first index").to.be.true;
                });

                it('Property @context inside vc should have the string JWT in the second item', function() {
                  expect(validators.credentials.shouldContextInVCInDecodedPayloadBeAnArrayWithTheStringJWTInTheSecondIndex(credentialObject[keyCredential]), "Property '@context' should be an array with the string JWT in the second index").to.be.true;
                });

                it('Property type inside vc is required', function() {
                  expect(validators.credentials.shouldTypeInVCInDecodedPayloadExist(credentialObject[keyCredential]), "Property 'type' inside property vc in decoded payload is required").to.be.true;
                });

                it('Property type inside vc should be an array with two strings', function() {
                  expect(validators.credentials.shouldTypeInVCInDecodedPayloadBeAnArrayWithTwoStrings(credentialObject[keyCredential]), "Property 'type' inside property vc in decoded payload should be an array with two strings").to.be.true;
                });

                it('Property type inside vc should be an array with \'VerifiableCredential\' as the first item of the array', function() {
                  expect(validators.credentials.shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credentialObject[keyCredential]), "Property 'type' inside property vc in decoded payload should be an array with 'VerifiableCredential' as the first item").to.be.true;
                });

                it('Property credentialSubject inside vc is required', function() {
                  expect(validators.credentials.shouldCredentialSubjectInVCInDecodedPayloadExist(credentialObject[keyCredential]), "Property 'credentialSubject' inside property vc in decoded payload is required").to.be.true;
                });

                it('Property credentialSubject inside vc is an object which has one property called levelOfAssurance', function() {
                  expect(validators.credentials.shouldCredentialSubjectInVCInDecodedPayloadHasAPropertyCalledLevelOfAssurance(credentialObject[keyCredential]), "Property 'credentialSubject' inside property vc in decoded payload have a property called 'levelOfAssurance'").to.be.true;
                });

                it('Property levelOfAssurance, inside credentialSubject, inside vc should be a number between 0 and 3', function() {
                  expect(validators.credentials.shouldLevelOfAssuranceInVCInDecodedPayloadBeANumberBetweenZeroAndThree(credentialObject[keyCredential]), "Property 'levelOfAssurance' in decoded payload only accepts values between zero and three (0 - 3)").to.be.true;
                });

                it('Property credentialSubject inside vc is an object with two properties', function() {
                  expect(validators.credentials.shouldCredentialSubjectInVCInDecodedPayloadHaveTwoProperties(credentialObject[keyCredential]), "Property 'credentialSubject' in decoded payload should have two properties").to.be.true;
                });
              });
            });
          });
        });

        describe("Testing alastria tokens", () => {
          vendor.tokens.forEach(tokenObject => {
            var keyToken = Object.keys(tokenObject);
            var token = tokenObject[keyToken];
  
            describe("Testing Token: " + token, () => {
              it('Token should exist', function () {
                expect(validators.tokens.shouldExist(token), "Token should exist").to.be.true;
              });

              it('Token should be a valid JWT structure', function () {
                expect(validators.tokens.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token), "It should follow the structure string.string.string").to.be.true;
              });

              it('Decoded header should be a valid JSON', function() {
                expect(validators.tokens.shouldDecodedHeaderBeAValidJSON(token), "Header is not a valid JSON once it is decoded").to.be.true;
              });
  
              it('Decoded payload should be a valid JSON', function() {
                expect(validators.tokens.shouldDecodedPayloadBeAValidJSON(token), "Payload is not a valid JSON once it is decoded").to.be.true;
              });

              describe("Testing payload of the token", () => {
                it('Decoded payload should have an iss property (issuer)', function() {
                  expect(validators.tokens.shouldPropertyISSInDecodedPayloadExist(token), "Property 'iss' inside decoded payload is required").to.be.true;
                });

                it('Property ISS of the decoded payload should be a valid Alastria DID', function() {
                  expect(validators.tokens.shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(token), "Property 'iss' inside decoded payload should be a valid Alastria DID").to.be.true;
                });

                it('Decoded payload should have an GWU property (gateway URL)', function() {
                  expect(validators.tokens.shouldPropertyGWUInDecodedPayloadExist(token), "Property 'gwu' inside decoded payload is required").to.be.true;
                });

                it('Property GWU of the decoded payload should be a valid URL', function() {
                  expect(validators.tokens.shouldPropertyGWUInDecodedPayloadBeAValidURL(token), "Property 'gwu' inside decoded payload should be a valid URL").to.be.true;
                });

                it('Decoded payload should have an CBU property (callback URL)', function() {
                  expect(validators.tokens.shouldPropertyCBUInDecodedPayloadExist(token), "Property 'cbu' inside decoded payload is required").to.be.true;
                });

                it('Property CBU of the decoded payload should be a valid URL', function() {
                  expect(validators.tokens.shouldPropertyCBUInDecodedPayloadBeAValidURL(token), "Property 'cbu' inside decoded payload should be a valid URL").to.be.true;
                });

                it('Decoded payload should have an ani property (Alastria Network Id)', function() {
                  expect(validators.tokens.shouldPropertyANIInDecodedPayloadExist(token), "Property 'ani' inside decoded payload is required").to.be.true;
                });

                it('Decoded payload should have an iat property (Issued at)', function() {
                  expect(validators.tokens.shouldPropertyIATInDecodedPayloadExist(token), "Property 'iat' inside decoded payload is required").to.be.true;
                });

                it('Property IAT of the decoded payload should be a valid number representing an epoch date', function() {
                  expect(validators.tokens.shouldPropertyIATInDecodedPayloadBeAValidJSONDate(token), "Property 'iat' inside decoded payload should be a valid number representing an epoch date").to.be.true;
                });

                it('Decoded payload should have an exp property (expiration date)', function() {
                  expect(validators.tokens.shouldPropertyEXPInDecodedPayloadExist(token), "Property 'exp' inside decoded payload is required").to.be.true;
                });

                it('Property EXP of the decoded payload should be a valid number representing an epoch date', function() {
                  expect(validators.tokens.shouldPropertyEXPInDecodedPayloadBeAValidJSONDate(token), "Property 'exp' inside decoded payload should be a valid number representing an epoch date").to.be.true;
                });

                it('Property NBF of the decoded payload, if exists, should be a valid number representing an epoch date', function() {
                  expect(validators.tokens.shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists(token), "Property 'nbf' inside decoded payload, if exists, should be a valid number representing an epoch date").to.be.true;
                });
              });
            });
          });
        });
      });
    });
});