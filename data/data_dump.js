'use strict';
// dump
const fs = require('fs');
const constants = require("../src/application_constants")
const rawdata = fs.readFileSync('./resources/country-state.json');

// AWS
const AWS = require('aws-sdk');
const region = constants.AWS_REGION
AWS.config.update({ region });
const TableName = constants.TABLE_COUNTRY_STATES
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const loading = (() => {
    // States String
    const state_str = (states) => {
        return states.map(state => {
            return { 'S': state }
        })
    }

    // Payload
    const create_items = (payload) => {
        const { country, states } = payload
        return {
            Item: { country: { S: country }, states: { L: state_str(states) } },
            ReturnConsumedCapacity: "TOTAL",
            TableName
        };
    }

    // Persist Data
    const write_to_dynamo = (params) => {
        dynamodb.putItem(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(`Successfully Persisted: ${JSON.stringify(params.Item)}`);
        });
    }

    // Call to Write 
    var loaded_countries = []
    const load_data = JSON.parse(rawdata).countries.forEach(record => {
        const payload = create_items(record)
        write_to_dynamo(payload)
        loaded_countries.push(record.country)
    })
    return "Loading Initiated..." + region;
})()

console.log(`Countries loaded ${JSON.stringify(loading)}`)
