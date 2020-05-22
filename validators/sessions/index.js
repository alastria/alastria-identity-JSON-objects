'use strict';
const commonValidators = require('../common-validators')
const didValidators = require('../did/index')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyCONTEXTInDecodedPayloadBeAValidURL":shouldPropertyCONTEXTInDecodedPayloadBeAValidURL,
    "isISSValidForAlastria": isISSValidForAlastria,
    "isDATAValidForAlastria": isDATAValidForAlastria
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

module.exports = sessionValidadorFactory;
