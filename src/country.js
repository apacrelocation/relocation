'use strict';
const data = require('./data')
// List Countries
const countries = (event, context, callback) => {
  data.countries((err, data) => {
    var message
    var statusCode = 503
    if (err) {
      message = err.message
    } else {
      message = data.Items
      statusCode = 200
    }
    const input = event
    const body = JSON.stringify({ message, input })
    callback(null, { statusCode, body })
  });
};

module.exports = { countries }