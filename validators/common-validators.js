'use strict';

const commonValidators = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots
}

function shouldExist(object) {
    return object != null && object != undefined;
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(object) {
    let JWTStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return JWTStructureRegEx.test(object); 
}

module.exports = commonValidators;