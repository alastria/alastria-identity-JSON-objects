var describe = require('mocha').describe
var expect = require('chai').expect;
const vendors = require('./vendors');
const validators = require('./validators')

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
      describe(vendor.name, () => {
        
        vendor.dids.forEach(didObject => {
          var keysDIDs = Object.keys(didObject);
          
          keysDIDs.forEach(keyDID => {
            it('did should exist', function () {
              expect(validators.did.shouldExist(didObject[keyDID])).to.be.true;
            });
          });
        })
      });
    });
});