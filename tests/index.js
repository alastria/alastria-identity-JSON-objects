const dids = require('./did')
const credentials = require('./credentials')
const tokens = require('./tokens')
const tests = {
    "dids": dids,
    "credentials": credentials,
    "tokens": tokens
}

module.exports.tests = tests;