'use strict';
const path = require('path');

const dirWhereVendorCredentialssAreStored = path.join(__dirname, 'custom-credentials');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorCredentialssAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const credentials = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorCredentialssAreStored, f).toString()));
});
module.exports = credentials;