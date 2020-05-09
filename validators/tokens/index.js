'use strict';

const tokenValidadorFactory = {
    "shouldExist": shouldExist
}

function shouldExist(token) {
    return token != null && token != undefined;
}

module.exports = tokenValidadorFactory;
