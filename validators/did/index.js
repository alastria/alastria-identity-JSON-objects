'use strict';

const didValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldStartWithDID": shouldStartWithDID
}

function shouldExist(did) {
    return did != null && did != undefined;
}

function shouldStartWithDID(did) {
    return did.startsWith("did:");
}

module.exports = didValidadorFactory;
