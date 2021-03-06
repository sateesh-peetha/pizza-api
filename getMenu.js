const AWS = require('aws-sdk');
const utils = require('./utils');
AWS.config.update({ region: 'eu-central-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
    const params = {
        TableName: 'menu',
    };
    try {
        const result = await docClient.scan(params).promise();
        return new Promise(res => res(utils.resp(result.Items, 200)));
    }
    catch (e) {
        console.log(e.stack);
        return new Promise(res => res(utils.resp(e.message || "Internal Server Error", 500)));
    }

}
