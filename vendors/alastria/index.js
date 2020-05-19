'use strict';

const dids = require('./dids');
const credentials = require('./credentials');
const tokens = require('./tokens')
const presentationRequests = require('./presentationRequests')

module.exports = {
  name: 'Alastria',
  dids: [...dids],
  credentials: [...credentials],
  tokens: [...tokens],
  presentationRequests: [...presentationRequests]
};