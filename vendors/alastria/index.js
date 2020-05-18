'use strict';

const dids = require('./dids');
const credentials = require('./credentials');
const tokens = require('./tokens');
const presentations = require('./presentations');

module.exports = {
    name: 'Alastria',
    dids: [...dids],
    credentials: [...credentials],
    tokens: [...tokens],
    presentations: [...presentations]
};