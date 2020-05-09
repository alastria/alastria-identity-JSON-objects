'use strict';
const jwt = require('jsonwebtoken');
const didValidation = require('./did/index.js');

const commonValidators = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "getJWTDecodedAsJSON": getJWTDecodedAsJSON,
    "shouldDecodedHeaderBeAValidJSON": shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": shouldDecodedPayloadBeAValidJSON,
    "shouldPropertyISSInDecodedPayloadExist": shouldPropertyISSInDecodedPayloadExist,
    "shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID": shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID
}

function shouldExist(object) {
    return object != null && object != undefined;
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(object) {
    let JWTStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return JWTStructureRegEx.test(object); 
}

function getJWTDecodedAsJSON(jwtAsBase64) {
    return jwt.decode(jwtAsBase64, {complete: true});
}

function shouldDecodedHeaderBeAValidJSON(jwtObject) {
    let decodedJWT = getJWTDecodedAsJSON(jwtObject);
    return decodedJWT != null && decodedJWT.header != null;
}

function shouldDecodedPayloadBeAValidJSON(jwtObject) {
    let decodedJWT = getJWTDecodedAsJSON(jwtObject);
    return decodedJWT != null && decodedJWT.payload != null;
}

function shouldPropertyISSInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return decodedJWT.payload.iss != null && decodedJWT.payload.iss != "";
}

function shouldPropertyISSInDecodedPayloadBeAValidAlastriaDID(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return didValidation.isDIDValidForAlastria(decodedJWT.payload.iss);
}

module.exports = commonValidators;