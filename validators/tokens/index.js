'use strict';
const commonValidators = require('../common-validators')

const tokenValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": shouldDecodedPayloadBeAValidJSON
}

function shouldExist(token) {
    return commonValidators.shouldExist(token)
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token)
}

function shouldDecodedHeaderBeAValidJSON(token) {
    return commonValidators.shouldDecodedHeaderBeAValidJSON(token);
}

function shouldDecodedPayloadBeAValidJSON(token) {
    return commonValidators.shouldDecodedPayloadBeAValidJSON(token);
}

module.exports = tokenValidadorFactory;
