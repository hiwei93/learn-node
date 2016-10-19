/**
 * 教程的作业
 */

'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var defaultFile = ['index.html', 'default.html'];

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

// 创建服务器:
var server = http.createServer(function(require, response){
     // 获得URL的path，类似 '/css/bootstrap.css':
     var pathname = url.parse(require.url).pathname;
    //  获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            //没有出错且文件存在
            console.log('200 ' + require.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        } else if(!err && stats.isDirectory()){
            //没有出错且文件夹存在
            console.log('200 ' + require.url);
            //发送200响应
            response.writeHead(200);
            console.log(filepath);
            filepath = path.join(root, defaultFile[0]);
            fs.createReadStream(filepath).pipe(response);
        } else {
            //出错或者文件不存在
            console.log('404 ' + require.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 Not Found!');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');