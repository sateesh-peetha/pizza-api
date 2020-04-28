const AWS = require('aws-sdk');
const utils = require('./utils');
const uuid = require('uuid/v4');
AWS.config.update({ region: 'eu-central-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {

    let req = {};
    try {
        req = JSON.parse(event.body);
        const params = {
            TableName: 'order',
        };
        params.Item = { ...req, id: uuid() };
        const result = await docClient.put(params).promise();
        return new Promise(res => res(utils.resp("Your Order is Confirmed", 200)));
    }
    catch (e) {
        console.log(e.stack);
        return new Promise(res => res(utils.resp(e.message || "Internal Server Error", 500)));
    }

}


