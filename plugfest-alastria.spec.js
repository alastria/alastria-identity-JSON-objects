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
              });
            });
          });
        });
      });
    });
});