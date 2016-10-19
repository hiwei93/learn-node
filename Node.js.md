# Node.js

## 一、模块

``` javascript
module.exports = greet;
```
把函数`greet`作为模块的输出暴露出去，使其他模块就可以使用`greet`函数。

引入`hello`模块用`Node`提供的`require`函数：
``` javascript
var greet = require('./hello');
```

## 二、基本模块

### 1.global

>Node.js的全局对象

### 2.process

>Node.js提供的对象，代表当前Node.js进程

### 3.文件系统模块`fs`

>`fs`模块负责读写文件，同时提供同步和异步方法。

#### 1.读取文件

>引入`fs`模块
``` javascript
var fs = require('fs');
```
异步方法：
1.读取文本文件
``` javascript
fs.readFile(fileName, code, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```
--fileName: 读取的文件路径和文件名；
--code: 文件编码方式；
-- function: 回调函数，第一个参数`err`代表错误信息，第二个参数`data`代表结果
2.读取二进制文件（如图片）
``` javascript
fs.readFile(fileName, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
```
--回调函数的`data`参数将返回一个`Buffer`对象;
``` javascript
// Buffer -> String
data.toString('utf-8');
// String -> Buffer
new Buffer(text, 'utf-8');
```

>同步方法
``` javascript
try {
    var data = fs.readFileSync(fileName, code);
    console.log(data);
} catch (err) {
    console.log(err);
}
```

#### 2.写文件

>引入`fs`模块
``` javascript
var fs = require('fs');
```
异步方法：
写文本文件
``` javascript
fs.writeFile(fileName, data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
```
--data: 写入的数据；
异步方法：
``` javascript
try {
    var data = 'test Sync!'
    fs.writeFileSync(fileName, data);
    console.log('The file is writed!');
} catch (err) {
    console.log(err);
}
```

#### 3.获取文件信息

>引入`fs`模块
``` javascript
var fs = require('fs');
```
异步方法：
``` javascript
fs.stat(fileName, function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        }
});
```
同步方法：
``` javascript
try {
    var stat = fs.statSync(fileName);
    console.log('size: ' + stat.size);
    //是否是文件
    console.log('isFile: ' + stat.isFile());
    //是否是目录
    console.log('isDirectory: ' + stat.isDirectory());
} catch (err) {
    console.log(err);
}

### 4.http

>To use the HTTP server and client
1. 导入http模块:
``` javascript
var http = require('http');
```
2.创建http server，并传入回调函数:
``` javascript
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
	console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
	response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
	response.end('<h1>Hello world!</h1>');
});
```
3.让服务器监听8080端口:
``` javascript
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
```

### 5.加密算法模块儿`cryto`

crypto模块提供通用的加密和哈希算法。
