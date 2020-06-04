'use strict';
const commonValidators = require('../common-validators')

const sessionValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots,
    "isCONTEXTValidForAlastria":isCONTEXTValidForAlastria,
    "isTYPEValidForAlastria": isTYPEValidForAlastria,
    "isATValidForAlastria": isATValidForAlastria
}

function isCONTEXTValidForAlastria(decodedJWT){
    return commonValidators.isValidContext(decodedJWT.payload["@context"]);
}

function isTYPEValidForAlastria(decodedJWT){
    return commonValidators.isValidType(decodedJWT.payload["type"]);
}

function isATValidForAlastria(decodedJWT) {
    return commonValidators.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(decodedJWT.payload.alastriaToken);
}

function isTYPEValidForAlastria(decodedJWT){
    return decodedJWT.payload.type.includes("AlastriaSession");
}

module.exports = sessionValidadorFactory;
