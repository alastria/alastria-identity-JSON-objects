'use strict';

const dids = require('./dids');
const credentials = require('./credentials');
const tokens = require('./tokens');
const sessions = require('./sessions');
const presentationRequests = require('./presentationRequests')
const presentations = require('./presentations');

module.exports = {
  name: 'Alastria',
  dids: [...dids],
  credentials: [...credentials],
  tokens: [...tokens],
  presentationRequests: [...presentationRequests],
  sessions: [...sessions],
  presentations: [...presentations]
};