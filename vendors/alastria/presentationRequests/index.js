'use strict';
const path = require('path');

const dirWhereVendorPresentationRequestsAreStored = path.join(__dirname, 'custom-presentationRequests');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorPresentationRequestsAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const presentationRequests = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorPresentationRequestsAreStored, f).toString()));
});
module.exports = presentationRequests;