'use strict';
const commonValidators = require('../common-validators')

const credentialValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedSignatureBeAValidJSON": shouldDecodedSignatureBeAValidJSON,
    "shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex": shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex,
    "shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem": shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem
}

function shouldDecodedSignatureBeAValidJSON(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential != null && decodedCredential.signature != null;
}

function shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    let context = decodedCredential.payload.vc["@context"];
    return commonValidators.isValidURL(context[0]); 
}

function shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem(credential) {
    let decodedCredential = commonValidators.getJWTDecodedAsJSON(credential);
    return decodedCredential.payload.vc["type"][0] == 'VerifiableCredential'
}

module.exports = credentialValidadorFactory;