var describe = require('mocha').describe
var expect = require('chai').expect;
var should = require('chai').should();
const vendors = require('./vendors');

describe('Plugfest Alastria 2020', () => {
    vendors.forEach(vendor => {
      describe(vendor.name, () => {
        
        vendor.dids.forEach(didObject => {
          var keysDIDs = Object.keys(didObject);
          
          keysDIDs.forEach(keyDID => {
            it('did should exist', function () {
              console.log(didObject[keyDID]);
              should.exist(didObject[keyDID]);
            });
          });
        })
      });
    });
});