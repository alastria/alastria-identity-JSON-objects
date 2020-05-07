'use strict';

const didValidadorFactory = {
    "shouldExist": shouldExist,
    "shouldStartWithDID": shouldStartWithDID,
    "shouldHaveAlaAsIdentifier": shouldHaveAlaAsIdentifier,
    "shouldHaveQuorOrFabrAsNetwork": shouldHaveQuorOrFabrAsNetwork,
    "shouldProxyAddressBeHexadecimal": shouldProxyAddressBeHexadecimal
}

function shouldExist(did) {
    return did != null && did != undefined;
}

function shouldStartWithDID(did) {
    return did.split(":")[0] == 'did';
}

function shouldHaveAlaAsIdentifier(did) {
    return did.split(":")[1] == 'ala';
}

function shouldHaveQuorOrFabrAsNetwork(did) {
    let network = did.split(":")[2];
    return (network == 'quor' || network == 'fabr');
}

function shouldProxyAddressBeHexadecimal(did) {
    let proxyAddress = did.split(":")[4]
    let regExToValidateHex = /^(?:0[xX])?[0-9a-fA-F]+$/;
    return regExToValidateHex.test(proxyAddress); 
}

module.exports = didValidadorFactory;
