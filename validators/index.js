'use strict';
const didValidators = require('./did/index.js')
const credentialsValidators = require('./credentials/index.js')
const tokensValidators = require('./tokens/index.js')
const presentationRequestsValidators = require('./presentationRequests/index.js')
const presentationsValidators = require('./presentations/index.js')

const validators = {
    "did": didValidators,
    "credentials": credentialsValidators,
    "tokens": tokensValidators,
    "presentationRequests": presentationRequestsValidators,
    "presentations": presentationsValidators
}

module.exports = validators;