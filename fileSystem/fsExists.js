'use strict';

var fs = require('fs');
var filepath = '';
var defaultFile = ['default.html', 'index.html'];
var root = 'E:\\Class\\imooc\\01-前端\\CSS3扁平化风格博客\\';
var exist = false;

fs.exists('E:\\Class\\imooc\\01-前端\\CSS3扁平化风格博客\\index.html', function (exists) {

    var retTxt = exists ? retTxt = '文件存在' : '文件不存在';

    console.log(exists + retTxt);

});