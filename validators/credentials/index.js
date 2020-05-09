'use strict';
const jwt = require('jsonwebtoken');
const didValidation = require('../did');
const urlRegex = require('url-regex');
const commonValidators = require('../common-validators')

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
    "shouldPropertyIATInDecodedPayloadExist": shouldPropertyIATInDecodedPayloadExist,
    "shouldPropertyIATInDecodedPayloadBeAValidJSONDate": shouldPropertyIATInDecodedPayloadBeAValidJSONDate,
    "shouldPropertyEXPInDecodedPayloadBeAValidJSONDateIfExists": shouldPropertyEXPInDecodedPayloadBeAValidJSONDateIfExists,
    "shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists": shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists,
    "shouldPropertyVCInDecodedPayloadExist": shouldPropertyVCInDecodedPayloadExist,
    "shouldContextInVCInDecodedPayloadExist": shouldContextInVCInDecodedPayloadExist,
    "shouldContextInVCInDecodedPayloadBeAnArrayWithTwoElements": shouldContextInVCInDecodedPayloadBeAnArrayWithTwoElements,
    "shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex": shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex,
    "shouldContextInVCInDecodedPayloadBeAnArrayWithTheStringJWTInTheSecondIndex": shouldContextInVCInDecodedPayloadBeAnArrayWithTheStringJWTInTheSecondIndex,
    "shouldTypeInVCInDecodedPayloadExist": shouldTypeInVCInDecodedPayloadExist,
    "shouldTypeInVCInDecodedPayloadBeAnArrayWithTwoStrings": shouldTypeInVCInDecodedPayloadBeAnArrayWithTwoStrings,
    "shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem": shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem,
    "shouldCredentialSubjectInVCInDecodedPayloadExist": shouldCredentialSubjectInVCInDecodedPayloadExist,
    "shouldCredentialSubjectInVCInDecodedPayloadHasAPropertyCalledLevelOfAssurance": shouldCredentialSubjectInVCInDecodedPayloadHasAPropertyCalledLevelOfAssurance,
    "shouldLevelOfAssuranceInVCInDecodedPayloadBeANumberBetweenZeroAndThree": shouldLevelOfAssuranceInVCInDecodedPayloadBeANumberBetweenZeroAndThree,
    "shouldCredentialSubjectInVCInDecodedPayloadHaveTwoProperties": shouldCredentialSubjectInVCInDecodedPayloadHaveTwoProperties
}

function shouldExist(credential) {
    return commonValidators.shouldExist(credential);
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credential) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credential);
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

function isValidEPOCHDate(value) {
    return Number.isInteger(value) && ((new Date(value)).getTime() > 0);
}

function shouldPropertyIATInDecodedPayloadBeAValidJSONDate(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return isValidEPOCHDate(decodedCredential.payload.iat);
}

function shouldPropertyEXPInDecodedPayloadBeAValidJSONDateIfExists(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    if (decodedCredential.payload.exp == null || decodedCredential.payload.exp == '')
        return true;
    else
        return isValidEPOCHDate(decodedCredential.payload.exp);
}

function shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    if (decodedCredential.payload.nbf == null || decodedCredential.payload.nbf == '')
        return true;
    else
        return isValidEPOCHDate(decodedCredential.payload.nbf);
}

function shouldPropertyVCInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc != null && decodedCredential.payload.vc != "";
}

function shouldContextInVCInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc["@context"] != null && decodedCredential.payload.vc["@context"] != "";
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithTwoElements(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return (context.length == 2);
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return urlRegex({exact: true}).test(context[0]); 
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithTheStringJWTInTheSecondIndex(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return context[1] == "JWT"
}

function shouldTypeInVCInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"] != null && decodedCredential.payload.vc["type"] != "";
}

function shouldTypeInVCInDecodedPayloadBeAnArrayWithTwoStrings(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"].length == 2 
        && (typeof decodedCredential.payload.vc["type"][0] == 'string')
        && (typeof decodedCredential.payload.vc["type"][1] == 'string');
}

function shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"][0] == 'VerifiableCredential'
}

function shouldCredentialSubjectInVCInDecodedPayloadExist(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return decodedCredential.payload.vc["credentialSubject"] != null && decodedCredential.payload.vc["credentialSubject"] != "";
}

function shouldCredentialSubjectInVCInDecodedPayloadHasAPropertyCalledLevelOfAssurance(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return 'levelOfAssurance' in decodedCredential.payload.vc["credentialSubject"];
}

function shouldLevelOfAssuranceInVCInDecodedPayloadBeANumberBetweenZeroAndThree(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    let levelOfAssurance = decodedCredential.payload.vc["credentialSubject"]["levelOfAssurance"];
    return (typeof levelOfAssurance == 'number')
        && levelOfAssurance >= 0
        && levelOfAssurance <= 3;
}

function shouldCredentialSubjectInVCInDecodedPayloadHaveTwoProperties(credential) {
    let decodedCredential = getCredentialDecodedAsJSON(credential);
    return Object.keys(decodedCredential.payload.vc["credentialSubject"]).length == 2
}

module.exports = credentialValidadorFactory;