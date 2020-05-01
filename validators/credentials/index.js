'use strict';
const jwt = require('jsonwebtoken');

const credentialValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": shouldDecodedPayloadBeAValidJSON
}

function shouldExist(credential) {
    return credential != null && credential != undefined;
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credential) {
    let JWTStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return JWTStructureRegEx.test(credential); 
}

function getCredentialDecodedAsJSON(credentialAsBase64) {
    return jwt.decode(credentialAsBase64, {complete: true});
}

function shouldDecodedHeaderBeAValidJSON(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential != null && decodedCredential.header != null;
}

function shouldDecodedPayloadBeAValidJSON(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential != null && decodedCredential.payload != null;
}

module.exports = credentialValidadorFactory;