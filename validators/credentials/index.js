'use strict';

const credentialValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots
}

function shouldExist(credential) {
    return credential != null && credential != undefined;
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(credential) {
    let JWTStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return JWTStructureRegEx.test(credential); 
}

module.exports = credentialValidadorFactory;