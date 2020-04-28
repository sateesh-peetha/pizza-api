exports.resp = (r, statusCode) => {
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
