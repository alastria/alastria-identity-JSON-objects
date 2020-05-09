'use strict';

const tokenValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots": shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots
}

function shouldExist(token) {
    return token != null && token != undefined;
}

function shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(token) {
    let ATStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return ATStructureRegEx.test(token); 
}

module.exports = tokenValidadorFactory;
