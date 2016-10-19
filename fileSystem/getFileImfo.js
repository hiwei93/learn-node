'use strict';

//异步获取文件或目录的详细信息
var fs = require('fs');

// fs.stat('main.js', function(err, stat) {
//     if(err) {
//         console.log(err);
//     } else {
//         //是否是文件
//         console.log('isFile: ' + stat.isFile());
//         //是否是目录
//         console.log('isDirectory: ' + stat.isDirectory());
//         if(stat.isFile()) {
//             //文件大小
//             console.log('size: ' + stat.size);
//             //创建时间， Data对象
//             console.log('birth time: ' + stat.birthtime);
//             //修改时间
//             console.log('modified time: ' + stat.mtime);
//         }
//     }
// });

//同步获取文件或目录的详细信息

try {
    var stat = fs.statSync('gl.js');
    console.log('size: ' + stat.size);
    //是否是文件
    console.log('isFile: ' + stat.isFile());
    //是否是目录
    console.log('isDirectory: ' + stat.isDirectory());
    if(stat.isFile()) {
        //文件大小
        console.log('size: ' + stat.size);
        //创建时间， Data对象
        console.log('birth time: ' + stat.birthtime);
        //修改时间
        console.log('modified time: ' + stat.mtime);
    }
} catch (err) {
    console.log(err);
}
