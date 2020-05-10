'use strict';
const commonValidators = require('../common-validators')
const didValidation = require('../did/index.js');

const tokenValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "shouldDecodedHeaderBeAValidJSON": commonValidators.shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": commonValidators.shouldDecodedPayloadBeAValidJSON,
    "shouldPropertyISSInDecodedPayloadExist": commonValidators.shouldPropertyISSInDecodedPayloadExist,
    "shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID": shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID,
    "shouldPropertyGWUInDecodedPayloadExist": shouldPropertyGWUInDecodedPayloadExist
}

function shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return didValidation.isDIDValidForAlastria(decodedJWT.payload.iss);
}

function shouldPropertyGWUInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.shouldExist(decodedJWT.payload.gwu);
}

module.exports = tokenValidadorFactory;
