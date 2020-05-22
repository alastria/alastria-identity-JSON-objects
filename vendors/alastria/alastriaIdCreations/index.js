'use strict';
const path = require('path');

const dirWhereVendorAlastriaIdCreationsAreStored = path.join(__dirname, 'custom-alastriaIdCreations');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorAlastriaIdCreationsAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const alastriaIdCreations = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorAlastriaIdCreationsAreStored, f).toString()));
});
module.exports = alastriaIdCreations;