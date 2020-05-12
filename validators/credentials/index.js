'use strict';
const didValidation = require('../did');
const commonValidators = require('../common-validators')

const credentialValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": commonValidators.shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": commonValidators.shouldDecodedPayloadBeAValidJSON,
    "shouldDecodedSignatureBeAValidJSON": shouldDecodedSignatureBeAValidJSON,
    "shouldKidInsideDecodedHeaderBeAValidDIDForAlastria": shouldKidInsideDecodedHeaderBeAValidDIDForAlastria,
    "shouldPropertyISSInDecodedPayloadExist": commonValidators.shouldPropertyISSInDecodedPayloadExist,
    "shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID": shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID,
    "shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists": shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists,
    "shouldPropertyIATInDecodedPayloadExist": commonValidators.shouldPropertyIATInDecodedPayloadExist,
    "shouldPropertyIATInDecodedPayloadBeAValidJSONDate": commonValidators.shouldPropertyIATInDecodedPayloadBeAValidJSONDate,
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

function shouldDecodedSignatureBeAValidJSON(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential != null && decodedCredential.signature != null;
}

function getDIDFromKidWithoutKeys(kid) {
    return kid.split("#")[0]
}

function shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return didValidation.isDIDValidForAlastria(decodedJWT.payload.iss);
}

function shouldKidInsideDecodedHeaderBeAValidDIDForAlastria(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let didWithoutKeys = getDIDFromKidWithoutKeys(decodedCredential.header.kid);
    return didValidation.isDIDValidForAlastria(didWithoutKeys);
}

function shouldPropertySUBInDecodedPayloadBeAValidAlastriaDIDIfExists(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    if (decodedCredential.payload.sub == null || decodedCredential.payload.sub == '')
        return true;
    else
        return didValidation.isDIDValidForAlastria(decodedCredential.payload.sub);
}

function shouldPropertyEXPInDecodedPayloadBeAValidJSONDateIfExists(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    if (decodedCredential.payload.exp == null || decodedCredential.payload.exp == '')
        return true;
    else
        return commonValidators.isValidEPOCHDate(decodedCredential.payload.exp);
}

function shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    if (decodedCredential.payload.nbf == null || decodedCredential.payload.nbf == '')
        return true;
    else
        return commonValidators.isValidEPOCHDate(decodedCredential.payload.nbf);
}

function shouldPropertyVCInDecodedPayloadExist(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc != null && decodedCredential.payload.vc != "";
}

function shouldContextInVCInDecodedPayloadExist(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["@context"] != null && decodedCredential.payload.vc["@context"] != "";
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithTwoElements(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return (context.length == 2);
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return commonValidators.isValidURL(context[0]); 
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithTheStringJWTInTheSecondIndex(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return context[1] == "JWT"
}

function shouldTypeInVCInDecodedPayloadExist(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"] != null && decodedCredential.payload.vc["type"] != "";
}

function shouldTypeInVCInDecodedPayloadBeAnArrayWithTwoStrings(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"].length == 2 
        && (typeof decodedCredential.payload.vc["type"][0] == 'string')
        && (typeof decodedCredential.payload.vc["type"][1] == 'string');
}

function shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"][0] == 'VerifiableCredential'
}

function shouldCredentialSubjectInVCInDecodedPayloadExist(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["credentialSubject"] != null && decodedCredential.payload.vc["credentialSubject"] != "";
}

function shouldCredentialSubjectInVCInDecodedPayloadHasAPropertyCalledLevelOfAssurance(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return 'levelOfAssurance' in decodedCredential.payload.vc["credentialSubject"];
}

function shouldLevelOfAssuranceInVCInDecodedPayloadBeANumberBetweenZeroAndThree(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let levelOfAssurance = decodedCredential.payload.vc["credentialSubject"]["levelOfAssurance"];
    return (typeof levelOfAssurance == 'number')
        && levelOfAssurance >= 0
        && levelOfAssurance <= 3;
}

function shouldCredentialSubjectInVCInDecodedPayloadHaveTwoProperties(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return Object.keys(decodedCredential.payload.vc["credentialSubject"]).length == 2
}

module.exports = credentialValidadorFactory;