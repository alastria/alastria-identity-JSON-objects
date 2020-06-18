'use strict';
const jwt = require('jsonwebtoken');
const urlRegex = require('url-regex');

const commonValidators = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "getJWTDecodedAsJSON": getJWTDecodedAsJSON,
    "shouldDecodedHeaderBeAValidJSON": shouldDecodedHeaderBeAValidJSON,
    "shouldDecodedPayloadBeAValidJSON": shouldDecodedPayloadBeAValidJSON,
    "shouldPropertyISSInDecodedPayloadExist": shouldPropertyISSInDecodedPayloadExist,
    "isValidURL": isValidURL,
    "shouldPropertyIATInDecodedPayloadBeAValidJSONDate": shouldPropertyIATInDecodedPayloadBeAValidJSONDate,
    "shouldPropertyIATInDecodedPayloadExist": shouldPropertyIATInDecodedPayloadExist,
    "isValidEPOCHDate": isValidEPOCHDate
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

function isValidURL(str) {
    return urlRegex({exact: true}).test(str); 
}

function isValidEPOCHDate(value) {
    return Number.isInteger(value) && ((new Date(value)).getTime() > 0);
}

function shouldPropertyIATInDecodedPayloadBeAValidJSONDate(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return isValidEPOCHDate(decodedJWT.payload.iat);
}

function shouldPropertyIATInDecodedPayloadExist(jwtObject) {
    let decodedJWT = commonValidators.getJWTDecodedAsJSON(jwtObject);
    return shouldExist(decodedJWT.payload.iat);
}


module.exports = commonValidators;