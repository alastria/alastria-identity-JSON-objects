var expect = require('chai').expect;
const validators = require('../../validators')
var chai = require('chai');
chai.use(require('chai-json-schema'));
const jwt = require('jsonwebtoken');
var alastriaIdCreationSchema = require('../../validators/alastriaIdCreations/alastriaIdCreation-json-schema.json');


require('../commons');

function validateAlastriaIdCreation(alastriaIdCreationAsBase64) {
    it('Alastria ID Creation should exist', function () {
        expect(validators.alastriaIdCreations.shouldExist(alastriaIdCreationAsBase64), "Alastris ID Creation should exist").to.be.true;
    });

    it('Alastria ID Creation should be a valid JWT structure', function () {
        expect(validators.alastriaIdCreations.shouldHaveAValidJWTStructureWithThreeSegmentsSeparatedByDots(alastriaIdCreationAsBase64), "It should follow the structure string.string.string").to.be.true;
    });

    var decodedAlastriaIdCreation = jwt.decode(alastriaIdCreationAsBase64, {complete: true});

    it('Validate schema of the Alastria ID Creation ' + decodedAlastriaIdCreation, () => {
        expect(decodedAlastriaIdCreation).to.be.jsonSchema(alastriaIdCreationSchema);
    });

    it('Property ALASTRIATOKEN of the decoded payload should be a valid JWT structure', function () {
        expect(validators.alastriaIdCreations.isALASTRIATOKENValidForAlastria(decodedAlastriaIdCreation), "Property 'alastriaToken' inside decoded payload should be a valid JWT structure").to.be.true;
    });
}

const alastriaIdCreationTest = {
    "validateAlastriaIdCreation": validateAlastriaIdCreation
}

module.exports = alastriaIdCreationTest;