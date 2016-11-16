'use strict';

//异步写入文件
var fs = require('fs');

var data = 'this is writing test!';

fs.writeFile('output.txt', data, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('The file is writed!');
    }
});

//同步方法写入文件
try {
    var data = 'test Sync!'
    fs.writeFileSync('sync.txt', data);
    console.log('The file is writed!');
} catch (err) {
    console.log(err);
}