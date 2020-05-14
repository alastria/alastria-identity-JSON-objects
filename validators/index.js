'use strict';
const didValidators = require('./did/index.js')
const credentialsValidators = require('./credentials/index.js')
const tokensValidators = require('./tokens/index.js');
const sessionsValidators = require('./sessions/index.js');

const validators = {
    "did": didValidators,
    "credentials": credentialsValidators,
    "tokens": tokensValidators,
    "sessions": sessionsValidators
}

module.exports = validators;
