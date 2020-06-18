'use strict';
const commonValidators = require('../common-validators')

const credentialValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex": shouldContextInVCInDecodedPayloadBeAnArrayWithAnURLInTheFirstIndex,
    "shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem": shouldTypeInVCInDecodedPayloadBeAnArrayWithVerifiableCredentialAsTheFirstItem
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