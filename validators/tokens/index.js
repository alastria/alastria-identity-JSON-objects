'use strict';
const commonValidators = require('../common-validators')

const tokenValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyGWUInDecodedPayloadBeAValidURL": shouldPropertyGWUInDecodedPayloadBeAValidURL,
    "shouldPropertyCBUInDecodedPayloadBeAValidURL": shouldPropertyCBUInDecodedPayloadBeAValidURL
}

function shouldPropertyGWUInDecodedPayloadBeAValidURL(decodedJWT) {
    return commonValidators.isValidURL(decodedJWT.payload.gwu);
}

function shouldPropertyCBUInDecodedPayloadBeAValidURL(decodedJWT) {
    return commonValidators.isValidURL(decodedJWT.payload.cbu);
}

module.exports = tokenValidadorFactory;
