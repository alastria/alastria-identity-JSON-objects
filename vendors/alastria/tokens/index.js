'use strict';
const path = require('path');

const dirWhereVendorTokensAreStored = path.join(__dirname, 'custom-tokens');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorTokensAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const tokens = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorTokensAreStored, f).toString()));
});
module.exports = tokens;