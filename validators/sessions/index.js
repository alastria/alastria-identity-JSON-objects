'use strict';
const commonValidators = require('../common-validators')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyCONTEXTInDecodedPayloadBeAValidURL":shouldPropertyCONTEXTInDecodedPayloadBeAValidURL,
    "isDATAValidForAlastria": isDATAValidForAlastria
}

function shouldPropertyCONTEXTInDecodedPayloadBeAValidURL(decodedJWT){
    return commonValidators.isValidURL(decodedJWT.payload["@context"]);
}

function isDATAValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.data);
}

module.exports = sessionValidadorFactory;
