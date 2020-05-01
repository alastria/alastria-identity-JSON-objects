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
                expect(validators.did.shouldExist(didObject[keyDID])).to.be.true;
              });

              it('did should start with did:', function() {
                expect(validators.did.shouldStartWithDID(didObject[keyDID])).to.be.true;
              });

              it('did should start "ala" as identifier', function() {
                expect(validators.did.shouldHaveAlaAsIdentifier(didObject[keyDID])).to.be.true;
              });

              it('did should start "quor" or "fabr" as network', function() {
                expect(validators.did.shouldHaveQuorOrFabrAsNetwork(didObject[keyDID])).to.be.true;
              });

              it('did should have hex in proxyAddress', function() {
                expect(validators.did.shouldProxyAddressBeHexadecimal(didObject[keyDID])).to.be.true;
              });
            });
          });
        });

        vendor.credentials.forEach(credentialObject => {
          var keyCredential = Object.keys(credentialObject);

          describe("Testing Credentials: " + credentialObject[keyCredential], () => {
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
          });
        });
      });
    });
});