var expect = require("chai").expect;
const validators = require("../../validators");
var chai = require("chai");
chai.use(require("chai-json-schema"));
require("../commons");

const invalidDid =
  "did:ala:quor:telsius:0x47c144879C64558128B8C2FDDC28705649E2F839";
const validQuorumDid =
  "did:ala:quor:telsius:47c144879C64558128B8C2FDDC28705649E2F839";
const validFabricDid =
  "did:ala:quor:telsius:47c144879C64558128B8C2FDDC28705649E2F839";
const validBesuDid =
  "did:ala:quor:telsius:47c144879C64558128B8C2FDDC28705649E2F839";

function validateDID() {
  it("did should exist", function () {
    expect(validators.did.shouldExist(validQuorumDid)).to.be.true;
  });

  it("did should start with did:", function () {
    expect(validators.did.shouldStartWithDID(validQuorumDid)).to.be.true;
  });

  it('did should have "ala" as identifier', function () {
    expect(validators.did.shouldHaveAlaAsIdentifier(validQuorumDid)).to.be.true;
  });

  it('did should have "quor" or "fabr" or "besu" as network', function () {
    expect(validators.did.shouldHaveQuorOrFabrOrBesuAsNetwork(validQuorumDid))
      .to.be.true;
    expect(validators.did.shouldHaveQuorOrFabrOrBesuAsNetwork(validFabricDid))
      .to.be.true;
    expect(validators.did.shouldHaveQuorOrFabrOrBesuAsNetwork(validBesuDid)).to
      .be.true;
  });

  it("did proxyAddress should not start with 0x", function () {
    expect(validators.did.shouldProxyAddressBeValidString(invalidDid)).to.be
      .false;
    expect(validators.did.shouldProxyAddressBeValidString(validQuorumDid)).to.be
      .true;
  });

  it("did should have a valid string in proxyAddress", function () {
    expect(validators.did.shouldProxyAddressBeValidString(validQuorumDid)).to.be
      .true;
  });
}

const didTest = {
  validateDID: validateDID,
};

module.exports = didTest;
