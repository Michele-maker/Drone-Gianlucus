const notFoundHandler = require ('./not-found');
const internalHandler = require('./internal');
const validation = require('./validation-error');

module.exports = [notFoundHandler, validation, internalHandler];