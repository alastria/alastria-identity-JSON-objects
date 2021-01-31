'use strict';
const commonValidators = require('../common-validators')

const didValidadorFactory = {
    "shouldExist": commonValidators.shouldExist,
    "shouldStartWithDID": shouldStartWithDID,
    "shouldHaveAlaAsIdentifier": shouldHaveAlaAsIdentifier,
    "shouldHaveQuorOrFabrOrBesuAsNetwork": shouldHaveQuorOrFabrOrBesuAsNetwork,
    "shouldProxyAddressBeValidString": shouldProxyAddressBeValidString,
    "isDIDValidForAlastria": isDIDValidForAlastria
}

function shouldStartWithDID(did) {
    return did.split(":")[0] == 'did';
}

function shouldHaveAlaAsIdentifier(did) {
    return did.split(":")[1] == 'ala';
}

function shouldHaveQuorOrFabrOrBesuAsNetwork(did) {
    let network = did.split(":")[2];
    return (network == 'quor' || network == 'fabr' || network == 'besu');
}

function shouldProxyAddressBeValidString(did) {
    let proxyAddress = did.split(":")[4]
    let regExToValidateHex = /^[0-9a-fA-F]+$/;
    return regExToValidateHex.test(proxyAddress);
}

function isDIDValidForAlastria(did) {
    return commonValidators.shouldExist(did) && shouldStartWithDID(did)
    && shouldHaveAlaAsIdentifier(did) && shouldHaveQuorOrFabrOrBesuAsNetwork(did) && shouldProxyAddressBeValidString(did);
}

module.exports = didValidadorFactory;
