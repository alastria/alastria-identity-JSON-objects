'use strict';
const commonValidators = require('../common-validators')

const presentationRequestValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyCBUInDecodedPayloadBeAValidURL": shouldPropertyCBUInDecodedPayloadBeAValidURL
}

function shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedJWT) {
    return commonValidators.isValidURL(decodedJWT.payload.cbu);
}

module.exports = presentationRequestValidadorFactory;
