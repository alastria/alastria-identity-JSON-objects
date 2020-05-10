# alastria-identity-JSON-objects
Alastria ID Model specification JSON objects verification

In order to test the models of any vendor, follow these steps

### Install libraries
```sh
$ npm install

### Adding a Vendor

1. Add a folder with the keyname of the vendor inside the [vendors](./vendors) folder.

2. Inside that folder, add your index.js file, following the same structure as it is on Alastria's one [index.js](./vendors/alastria/index.js).

3. Update the [vendors](./vendors/index.js) adding your own require and including it in the array.

```js
const yourvariable = require('./yourkeyname');

const vendor_map = {
  alastria,
  yourvariable
};
```

4. Run the tests
```sh
$ npm test
```
