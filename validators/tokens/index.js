'use strict';
const commonValidators = require('../common-validators')
const didValidation = require('../did/index.js');

const tokenValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyGWUInDecodedPayloadBeAValidURL": shouldPropertyGWUInDecodedPayloadBeAValidURL,
    "shouldPropertyCBUInDecodedPayloadBeAValidURL": shouldPropertyCBUInDecodedPayloadBeAValidURL,

    "shouldPropertyIATInDecodedPayloadBeAValidJSONDate": commonValidators.shouldPropertyIATInDecodedPayloadBeAValidJSONDate,
    "shouldPropertyEXPInDecodedPayloadBeAValidJSONDate": shouldPropertyEXPInDecodedPayloadBeAValidJSONDate,
    "shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists": shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists
}

function shouldPropertyGWUInDecodedPayloadBeAValidURL(decodedJWT) {
    return commonValidators.isValidURL(decodedJWT.payload.gwu);
}

function shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedJWT) {
    return commonValidators.isValidURL(decodedJWT.payload.cbu);
}

function shouldPropertyEXPInDecodedPayloadBeAValidJSONDate(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.isValidEPOCHDate(decodedJWT.payload.exp);
}

function shouldPropertyNBFInDecodedPayloadBeAValidJSONDateIfExists(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    let nbf = decodedJWT.payload.nbf;

    if (nbf == null || nbf == '')
        return true;
    else
        return commonValidators.isValidEPOCHDate(nbf);
}

module.exports = tokenValidadorFactory;
