'use strict';

const dids = require('./dids');
const credentials = require('./credentials');
const tokens = require('./tokens')

module.exports = {
  name: 'Alastria',
  dids: [...dids],
  credentials: [...credentials],
  tokens: [...tokens]
};