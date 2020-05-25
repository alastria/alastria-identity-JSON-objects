'use strict';

const dids = require('./dids');
const credentials = require('./credentials');
const tokens = require('./tokens');
const sessions = require('./sessions');
const presentationRequests = require('./presentationRequests')
const presentations = require('./presentations');
const alastriaIdCreations = require('./alastriaIdCreations');

module.exports = {
  name: 'Alastria',
  dids: [...dids],
  credentials: [...credentials],
  tokens: [...tokens],
  presentationRequests: [...presentationRequests],
  presentations: [...presentations],
  sessions: [...sessions],
  alastriaIdCreations: [...alastriaIdCreations]
};