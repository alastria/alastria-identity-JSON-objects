'use strict';
const commonValidators = require('../common-validators')

const tokenValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": commonValidators.shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": commonValidators.shouldDecodedPayloadBeAValidJSON,
    "shouldPropertyISSInDecodedPayloadExist": commonValidators.shouldPropertyISSInDecodedPayloadExist
}

module.exports = tokenValidadorFactory;
