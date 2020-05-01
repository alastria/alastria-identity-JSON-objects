'use strict';

const credentialValidadorFactory = {
    "shouldExist": shouldExist
}

function shouldExist(credential) {
    return credential != null && credential != undefined;
}

module.exports = credentialValidadorFactory;