'use strict';
const jwt = require('jsonwebtoken');
const didValidation = require('../did');

const credentialValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": shouldDecodedPayloadBeAValidJSON,
    "shouldDecodedSignatureBeAValidJSON": shouldDecodedSignatureBeAValidJSON,
    "shouldKidInsideDecodedHeaderBeAValidDIDForAlastria": shouldKidInsideDecodedHeaderBeAValidDIDForAlastria,
    "shouldPropertyISSInDecodedPayloadExist": shouldPropertyISSInDecodedPayloadExist,
    "shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID": shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID,
    "shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists": shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists,
    "shouldPropertyIATInDecodedPayloadExist": shouldPropertyIATInDecodedPayloadExist
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

function shouldDecodedSignatureBeAValidJSON(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential != null && decodedCredential.signature != null;
}

function getDIDFromKidWithoutKeys(kid) {
    return kid.split("#")[0]
}

function shouldKidInsideDecodedHeaderBeAValidDIDForAlastria(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    let didWithoutKeys = getDIDFromKidWithoutKeys(decodedCredential.header.kid);
    return didValidation.isDIDValidForAlastria(didWithoutKeys);
}

function shouldPropertyISSInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.iss != null && decodedCredential.payload.iss != "";
}

function shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return didValidation.isDIDValidForAlastria(decodedCredential.payload.iss);
}

function shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    if (decodedCredential.payload.sub == null || decodedCredential.payload.sub == '')
        return true;
    else
        return didValidation.isDIDValidForAlastria(decodedCredential.payload.sub);
}

function shouldPropertyIATInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.iat != null && decodedCredential.payload.iat != "";
}

module.exports = credentialValidadorFactory;