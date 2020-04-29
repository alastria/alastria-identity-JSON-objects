'use strict';

const didValidadorFactory = {
    "shouldExist": shouldExist
}

function shouldExist(did) {
    return did != null && did != undefined;
}

module.exports = didValidadorFactory;
