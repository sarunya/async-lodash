const lodash = require('lodash');
const asyncMethods = require('./methods');

function bindMethodsToLodash() {
    for(let method in asyncMethods) {
        lodash.__proto__[method] = asyncMethods[method];
    }
    return lodash;
}

module.exports = bindMethodsToLodash();