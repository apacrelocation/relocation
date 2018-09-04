'use strict';
const AWS = require('aws-sdk');
const constants = require("./application_constants")
const region = constants.AWS_REGION
AWS.config.update({ region });
const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = constants.TABLE_COUNTRY_STATES
const params = { TableName };

// Grab Countries from Dyna
const countries = callback => {
  docClient.scan(params, (err, data) => {
    callback(err, data)
  });
};

module.exports = { countries }