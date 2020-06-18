'use strict';
const commonValidators = require('../common-validators')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "isATValidForAlastria": isATValidForAlastria
}

function isATValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.alastriaToken);
}

module.exports = sessionValidadorFactory;
