var expect = require("chai").expect;
const validators = require("../../validators");
var chai = require("chai");
chai.use(require("chai-json-schema"));
require("../commons");

const valid0xQuorumDid =
  "did:ala:quor:redt:0x47c144879C64558128B8C2FDDC28705649E2F839";
const validQuorumDid =
  "did:ala:quor:redt:47c144879C64558128B8C2FDDC28705649E2F839";
const validCaseInsensitiveQuorumDid =
  "did:ala:quor:redt:a3c144879C64cccc28B8C2FDDC2bbbb649E2F839";
const invalid0xLengthQuorumDid =
  "did:ala:quor:redt:0x47c144879C64558128B8C2FDDC28705649E2F839A";
const invalidLengthQuorumDid =
  "did:ala:quor:redt:47c144879C64558128B8C2FDDC28705649E2F839A";

const valid0xFabricDid =
  "did:ala:fabr:testnet1:0x47c144879C64558128B8C2FDDC28705649E2F839";
const validFabricDid =
  "did:ala:fabr:testnet1:47c144879C64558128B8C2FDDC28705649E2F839";
const validCaseInsensitiveFabricDid =
  "did:ala:fabr:testnet1:a3c144879C64cccc28B8C2FDDC2bbbb649E2F839";
const invalid0xLengthFabricDid =
  "did:ala:fabr:testnet1:0x47c144879C64558128B8C2FDDC28705649E2F839A";
const invalidLengthFabricDid =
  "did:ala:fabr:testnet1:47c144879C64558128B8C2FDDC28705649E2F839";
  
const valid0xBesuDid =
  "did:ala:besu:telsius:0x47c144879C64558128B8C2FDDC28705649E2F839";
const validBesuDid =
  "did:ala:besu:telsius:47c144879C64558128B8C2FDDC28705649E2F839";
const validCaseInsensitiveBesuDid =
  "did:ala:besu:telsius:a3c144879C64cccc28B8C2FDDC2bbbb649E2F839";
const invalid0xLengthBesuDid =
  "did:ala:besu:telsius:0x47c144879C64558128B8C2FDDC28705649E2F839A";
const invalidLengthBesuDid =
  "did:ala:besu:telsius:47c144879C64558128B8C2FDDC28705649E2F839";

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

  it("did Besu proxyAddress can start with or without 0x", function () {
    expect(validators.did.shouldProxyAddressBeValidString(valid0xBesuDid)).to.be
      .true;
    expect(validators.did.shouldProxyAddressBeValidString(validBesuDid)).to.be
      .true;
  });

  it("did Quorum proxyAddress can start with or without 0x", function () {
    expect(validators.did.shouldProxyAddressBeValidString(valid0xQuorumDid)).to.be
      .true;
    expect(validators.did.shouldProxyAddressBeValidString(validQuorumDid)).to.be
      .true;
  });

  it("did Fabric proxyAddress can start with or without 0x", function () {
    expect(validators.did.shouldProxyAddressBeValidString(valid0xFabricDid)).to.be
      .true;
    expect(validators.did.shouldProxyAddressBeValidString(validFabricDid)).to.be
      .true;
  });

  it("did should have a valid string in proxyAddress", function () {
    expect(validators.did.shouldProxyAddressBeValidString(validQuorumDid)).to.be
      .true;
  });

  it("invalid did length shouldn't be  accepted in proxyAddress", function () {
    expect(validators.did.shouldProxyAddressBeValidString(invalid0xLengthBesuDid)).to.be
      .false;
    expect(validators.did.shouldProxyAddressBeValidString(invalid0xLengthQuorumDid)).to.be
      .false;
    expect(validators.did.shouldProxyAddressBeValidString(invalid0xLengthFabricDid)).to.be
      .false;
  });

  it("did should not be case sensitive in proxyAddress", function () {
    expect(validators.did.shouldProxyAddressBeValidString(validCaseInsensitiveBesuDid)).to.be
      .true;
    expect(validators.did.shouldProxyAddressBeValidString(validCaseInsensitiveQuorumDid)).to.be
      .true;
    expect(validators.did.shouldProxyAddressBeValidString(validCaseInsensitiveFabricDid)).to.be
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
