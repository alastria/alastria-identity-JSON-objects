'use strict';
const path = require('path');

const dirWhereVendorSessionsAreStored = path.join(__dirname, 'custom-sessions');
const fs = require('fs');
const files = fs.readdirSync(dirWhereVendorSessionsAreStored).filter(f => {
  return f.indexOf('.json') !== -1;
});
const sessions = files.map(f => {
  return JSON.parse(fs.readFileSync(path.resolve(dirWhereVendorSessionsAreStored, f).toString()));
});
module.exports = sessions;