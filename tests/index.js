const dids = require('./did')
const credentials = require('./credentials')
const tokens = require('./tokens')
const sessions = require('./sessions')
const presentations = require('./presentations')
const tests = {
    "dids": dids,
    "credentials": credentials,
    "tokens": tokens,
    "sessions": sessions,
    "presentations": presentations
}

module.exports.tests = tests;