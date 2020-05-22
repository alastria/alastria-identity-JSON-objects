'use strict';
const commonValidators = require('../common-validators')

const presentationValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldPropertyPROCURLInDecodedPayloadBeAValidURL": shouldPropertyPROCURLInDecodedPayloadBeAValidURL
}


function shouldPropertyPROCURLInDecodedPayloadBeAValidURL(decodedJWT) {

    return commonValidators.isValidURL(decodedJWT.payload.vp.procUrl);

}


module.exports = presentationValidadorFactory;