const dids = require('./did')
const credentials = require('./credentials')
const tokens = require('./tokens')
const sessions = require('./sessions')
const tests = {
    "dids": dids,
    "credentials": credentials,
    "tokens": tokens,
    "sessions": sessions
}

module.exports.tests = tests;