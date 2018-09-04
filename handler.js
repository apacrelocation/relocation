'use strict';
const country = require('./src/country')
// List Country API Gateway End Point
const countries =  (event, context, callback) => country.countries(event, context, callback)

module.exports = { countries }