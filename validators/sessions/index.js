'use strict';
const commonValidators = require('../common-validators')
const didValidators = require('../did/index')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyCONTEXTInDecodedPayloadBeAValidURL":shouldPropertyCONTEXTInDecodedPayloadBeAValidURL,
    "isISSValidForAlastria": isISSValidForAlastria,
    "isDATAValidForAlastria": isDATAValidForAlastria,
    "shouldPKUBeHexadeciaml": shouldPKUBeHexadecimal,
    "shouldNBFBeValidEPOCHDate":shouldNBFBeValidEPOCHDate,
    "shouldNBFBeValidEPOCHDate":shouldNBFBeValidEPOCHDate,
    "shouldNBFBeValidEPOCHDate":shouldNBFBeValidEPOCHDate
}

function isISSValidForAlastria(decodedJWT) {
    return didValidators.isDIDValidForAlastria(decodedJWT.payload.iss);
}

function shouldPropertyCONTEXTInDecodedPayloadBeAValidURL(decodedJWT){
    return commonValidators.isValidURL(decodedJWT.payload.context);
}

function shouldPKUBeHexadecimal(decodedJWT) {
    let pku = decodedJWT.payload.pku;
    let regExToValidateHex = /^(?:0[xX])?[0-9a-fA-F]+$/;
    return regExToValidateHex.test(pku); 
}

function isDATAValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.data);
}

function shouldNBFBeValidEPOCHDate(decodedJWT) {
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.nbf);
}

function shouldIATBeValidEPOCHDate(decodedJWT) {
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.iat);
}

function shouldEXPBeValidEPOCHDate(decodedJWT) {
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.exp);
}

//TODO Validar JTI?



module.exports = sessionValidadorFactory;
