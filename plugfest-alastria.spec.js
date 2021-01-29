var describe = require("mocha").describe;
const vendors = require("./vendors");
var chai = require("chai");
chai.use(require("chai-json-schema"));
var { tests } = require("./tests");

describe("Plugfest Alastria 2020", () => {
  vendors.forEach((vendor) => {
    describe(vendor.name, () => {
      tests.dids.validateDID();

      vendor.credentials.forEach((credentialObject) => {
        var keyCredential = Object.keys(credentialObject);
        var credentialAsBase64 = credentialObject[keyCredential];

        describe("Testing Credential: " + credentialAsBase64, () => {
          tests.credentials.validateCredential(credentialAsBase64);
        });
      });

      describe("Testing alastria tokens with JSON Schemas", () => {
        vendor.tokens.forEach((tokenObject) => {
          var keyToken = Object.keys(tokenObject);
          var tokenAsBase64 = tokenObject[keyToken];

          describe("Testing Token: " + tokenAsBase64, () => {
            tests.tokens.validateToken(tokenAsBase64);
          });
        });
      });

      describe("Testing alastria sessions with JSON Schemas", () => {
        vendor.sessions.forEach((sessionObject) => {
          var keySessions = Object.keys(sessionObject);

          keySessions.forEach((keySession) => {
            var sessionAsBase64 = sessionObject[keySession];

            describe("Testing Session: " + sessionAsBase64, () => {
              tests.sessions.validateSession(sessionAsBase64);
            });
          });
        });
      });

      describe("Testing alastria presentation with JSON Schemas", () => {
        vendor.presentations.forEach((presentationObject) => {
          var keyPresentation = Object.keys(presentationObject);
          var presentationAsBase64 = presentationObject[keyPresentation];

          describe("Testing Presentation: " + presentationAsBase64, () => {
            tests.presentations.validatePresentation(presentationAsBase64);
          });
        });
      });
    });

    describe("Testing alastria Presentation Request with JSON Schemas", () => {
      vendor.presentationRequests.forEach((presentationRequestObject) => {
        var keyPresentationRequest = Object.keys(presentationRequestObject);
        var presentationRequestAsBase64 =
          presentationRequestObject[keyPresentationRequest];

        describe(
          "Testing Presentation Request: " + presentationRequestAsBase64,
          () => {
            tests.presentationRequests.validatePresentationRequest(
              presentationRequestAsBase64
            );
          }
        );
      });
    });

    describe("Testing Alastria ID Creation with JSON Schemas", () => {
      vendor.alastriaIdCreations.forEach((alastriaIdCreationObject) => {
        var keyAlastriaIdCreations = Object.keys(alastriaIdCreationObject);

        keyAlastriaIdCreations.forEach((keyAlastriaIdCreation) => {
          var aicAsBase64 = alastriaIdCreationObject[keyAlastriaIdCreation];

          describe("Testing Alastria ID Creation: " + aicAsBase64, () => {
            tests.alastriaIdCreations.validateAlastriaIdCreation(aicAsBase64);
          });
        });
      });
    });
  });
});
