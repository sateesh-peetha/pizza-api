const AWS = require('aws-sdk');
const data = require('./data').data;
AWS.config.update({ region: 'eu-central-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
    const params = {
        TableName: 'menu',
    };
    try {
        const result = await docClient.scan(params).promise();
        return new Promise(res => res(resp(result.Items, 200)));
    }
    catch (e) {
        console.log(e.stack);
        return new Promise(res => res(resp(e.message || "Internal Server Error", 500)));
    }

}

const resp = (r, statusCode) => {
    const e = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': "GET",
            'Access-Control-Allow-Headers': "*,Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(r)
    };
    return e;
}

