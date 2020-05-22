'use strict';
const commonValidators = require('../common-validators')

const alastriaIdCreationValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "isALASTRIATOKENValidForAlastria": isALASTRIATOKENValidForAlastria
}

function isALASTRIATOKENValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.alastriaToken);
}

module.exports = alastriaIdCreationValidadorFactory;
