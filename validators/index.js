'use strict';
const didValidators = require('./did/index.js')
const credentialsValidators = require('./credentials/index.js')

const validators = {
    "did": didValidators,
    "credentials": credentialsValidators
}

module.exports = validators;
