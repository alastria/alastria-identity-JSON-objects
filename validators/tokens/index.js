'use strict';
const commonValidators = require('../common-validators')

const tokenValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots
}

function shouldExist(token) {
    return commonValidators.shouldExist(token)
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token)
}

module.exports = tokenValidadorFactory;
