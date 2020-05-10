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
    "shouldPropertyGWUInDecodedPayloadExist": shouldPropertyGWUInDecodedPayloadExist,
    "shouldPropertyGWUInDecodedPayloadBeAValidURL": shouldPropertyGWUInDecodedPayloadBeAValidURL,
    "shouldPropertyCBUInDecodedPayloadExist": shouldPropertyCBUInDecodedPayloadExist,
    "shouldPropertyCBUInDecodedPayloadBeAValidURL": shouldPropertyCBUInDecodedPayloadBeAValidURL,
    "shouldPropertyANIInDecodedPayloadExist": shouldPropertyANIInDecodedPayloadExist,
    "shouldPropertyIATInDecodedPayloadExist": commonValidators.shouldPropertyIATInDecodedPayloadExist,
    "shouldPropertyIATInDecodedPayloadBeAValidJSONDate": commonValidators.shouldPropertyIATInDecodedPayloadBeAValidJSONDate,
}

function shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return didValidation.isDIDValidForAlastria(decodedJWT.payload.iss);
}

function shouldPropertyGWUInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.shouldExist(decodedJWT.payload.gwu);
}

function shouldPropertyGWUInDecodedPayloadBeAValidURL(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.isValidURL(decodedJWT.payload.gwu);
}

function shouldPropertyCBUInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.shouldExist(decodedJWT.payload.cbu);
}

function shouldPropertyCBUInDecodedPayloadBeAValidURL(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.isValidURL(decodedJWT.payload.cbu);
}

function shouldPropertyANIInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return commonValidators.shouldExist(decodedJWT.payload.ani);
}

module.exports = tokenValidadorFactory;
