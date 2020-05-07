'use strict';
const path = require('path');

const dirWhereVendorDIDsAreStored = path.join(__dirname, 'custom-dids');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorDIDsAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const dids = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorDIDsAreStored, f).toString()));
});
module.exports = dids;