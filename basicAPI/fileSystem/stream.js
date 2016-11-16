'use strict';

var fs = require('fs');

/**
 * 从文件流读取文本内容
**
//打开一个流
var rs = fs.createReadStream('hello.js', 'utf-8');

rs.on('data', function(chunk){
    console.log('DATA: ');
    console.log(chunk);
});

rs.on('end', function(){
    console.log('END');
});

rs.on('error', function(err){
    console.log('ERROR: ' + err);
});

/**
 * 以流的形式写入文件
 **
var ws1 = fs.createWriteStream('streamTest1.txt', 'utf-8');
ws1.write('Using Stream Object write data1...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('streamTest2.txt', 'utf-8');
ws2.write(new Buffer('Using Stream Object write data2...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

/**
 * 管道pipe
 */
var rs = fs.createReadStream('gl.js');
var ws = fs.createWriteStream('gl-s.js');

rs.pipe(ws);