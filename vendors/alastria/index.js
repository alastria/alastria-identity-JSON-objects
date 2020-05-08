'use strict';

const dids = require('./dids');
const credentials = require('./credentials');

module.exports = {
  name: 'Alastria',
  dids: [...dids],
  credentials: [...credentials]
};