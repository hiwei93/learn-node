'use strict';

var fs = require('fs');
var filepath = '';
var defaultFile = ['default.html', 'index.html'];
var root = 'E:\\Class\\imooc\\01-前端\\CSS3扁平化风格博客';

fs.readdir(root, function (err, files){
    if(err) {
        console.log('This dir is not exist!');
    } else {
        for(let i = 0; i < defaultFile.length; i++){
            if(files.indexOf(defaultFile[i]) !== -1){
                console.log(defaultFile[i] + ' is exist!');
                i = defaultFile.length;
            } else if (i === defaultFile.length - 1){
                console.log(defaultFile + 'is all exist!');
            }
        }
    }
});