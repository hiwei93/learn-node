'use strict';

// 一部读取文本文件
var fs = require('fs');

fs.readFile('../hello.js', 'utf-8', function(err, data) {
    if (err){
        console.log(err);
    } else {
        console.log(data + '\n');
    }
});

//读取图片文件
fs.readFile('simple.png', function(err, data) {
    if (err){
        console.log(err);
    } else {
        console.log(data);
        // console.log(data.toString('utf-8'));//Buffer --> String
        console.log(data.length + 'bytes');
    }
});

//同步读取文本文件
try {
    var data = fs.readFileSync('main.js', 'utf-8');
    console.log(data + '\n');  
} catch (err) {
    console.log(err);
}
