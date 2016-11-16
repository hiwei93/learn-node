'use strict';

/**
 * HTTP服务器
 */
// 1.导入http模块
var http = require('http');

// 2.创建http server，传入回调函数
var server = http.createServer(function(require, response){
    // 获得HTTP请求的method和url：
    console.log(require.method + " : " + require.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type' : 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello World!</h1>');
});

// 3.服务器监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
