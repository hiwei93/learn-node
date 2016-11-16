/**
 */
var fs = require('fs');

/**
 * add url-router(注册url)
 */
function addMapping(router, mapping) {
    for (var url in mapping) {
        if(url.startsWith('GET')){
            // 处理 GET URL
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping : GET ${path}`);
        } else if(url.startsWith('POST')){
            // 处理 POST url
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

/**
 * 扫描并运行文件
 */
function addControllers(router, dir) {
    // 用readdirSync列出文件
    var files = fs.readdirSync(__dirname + '/' + dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    console.log('js_files has ' + js_files);

    for (var f of js_files) {
        console.log(`process controller : ${f}...`);
        // 导入 js 文件
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers';
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}