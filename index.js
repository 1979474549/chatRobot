let express = require('express');
let url = require('url');
let req = require('request');

let app = new express();
app.use(express.static('./pages'));
app.listen(12142, function () {
    console.log('连接成功 正在监听12142端口');
});
app.get('/query', function (request, response) {
    let params = url.parse(request.url, true).query;
    let data = {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": params['text']
            }
        },
        "userInfo": {
            "apiKey": "dc1eaf9d93e84bd0a02c165b9178fc9c",
            "userId": "1123456"
        }
    };
    req({
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }, function (err, rep, body) {
        let data = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "x-requested-with, content-type"
        }
        if(!err) {
            response.writeHead(200, data);
            response.write(JSON.parse(body).results[0].values.text);
            response.end();
        }
    })

});