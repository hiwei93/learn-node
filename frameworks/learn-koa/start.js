/**
 * 自动让Babel转码，将 ES7 转换为 node.js 可执行的 ES6
 */
var register = require('babel-core/register');

register({
    presets: ['stage-3']
});

// require('./app.js');
require('./view-koa/app.js');
