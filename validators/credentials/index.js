'use strict';

const credentialValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldHaveAValidJWTStructure": shouldHaveAValidJWTStructure
}

function shouldExist(credential) {
    return credential != null && credential != undefined;
}

function shouldHaveAValidJWTStructure(credential) {
    let JWTStructureRegEx = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_+/=]*$/;
    return JWTStructureRegEx.test(credential); 
}

module.exports = credentialValidadorFactory;