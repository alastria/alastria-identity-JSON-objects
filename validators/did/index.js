'use strict';

const didValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldStartWithDID": shouldStartWithDID,
    "shouldHaveAlaAsIdentifier": shouldHaveAlaAsIdentifier
}

function shouldExist(did) {
    return did != null && did != undefined;
}

function shouldStartWithDID(did) {
    return did.split(":")[0] == 'did';
}

function shouldHaveAlaAsIdentifier(did) {
    return did.split(":")[1] == 'ala';
}

module.exports = didValidadorFactory;
