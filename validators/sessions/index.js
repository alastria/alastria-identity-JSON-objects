'use strict';
const commonValidators = require('../common-validators')
const didValidators = require('../did/index')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyCONTEXTInDecodedPayloadBeAValidURL":shouldPropertyCONTEXTInDecodedPayloadBeAValidURL,
    "isISSValidForAlastria": isISSValidForAlastria,
    "isDATAValidForAlastria": isDATAValidForAlastria,
    "shouldNBFBeValidEPOCHDate":shouldNBFBeValidEPOCHDate,
    "shouldIATBeValidEPOCHDate":shouldIATBeValidEPOCHDate,
    "shouldEXPBeValidEPOCHDate":shouldEXPBeValidEPOCHDate
}

function isISSValidForAlastria(decodedJWT) {
    return didValidators.isDIDValidForAlastria(decodedJWT.payload.iss);
}

function shouldPropertyCONTEXTInDecodedPayloadBeAValidURL(decodedJWT){
    return commonValidators.isValidURL(decodedJWT.payload["@context"]);
}

function isDATAValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.data);
}

function shouldNBFBeValidEPOCHDate(decodedJWT) {
    if (decodedJWT.payload.nbf == null || decodedJWT.payload.nbf == '')
        return true;
    else
        return commonValidators.isValidEPOCHDate(decodedJWT.payload.nbf);
}

function shouldIATBeValidEPOCHDate(decodedJWT) {
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.iat);
}

function shouldEXPBeValidEPOCHDate(decodedJWT) {
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.exp);
}

module.exports = sessionValidadorFactory;
