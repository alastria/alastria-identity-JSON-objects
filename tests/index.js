const dids = require('./did')
const credentials = require('./credentials')
const tokens = require('./tokens')
const sessions = require('./sessions')
const presentations = require('./presentations')
const presentationRequests = require('./presentationRequests')
const alastriaIdCreations = require('./alastriaIdCreations')
const tests = {
    "dids": dids,
    "credentials": credentials,
    "tokens": tokens,
    "sessions": sessions,
    "presentations": presentations,
    "presentationRequests": presentationRequests,
    "alastriaIdCreations": alastriaIdCreations
}

module.exports.tests = tests;