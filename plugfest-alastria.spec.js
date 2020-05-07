var describe = require('mocha').describe
const vendors = require('./vendors');

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
      describe(vendor.name, () => {

      });
    });
});