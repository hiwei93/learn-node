/**
 * [nunjucks 的文档](http://mozilla.github.io/nunjucks/getting-started.html)
 */
const nunjucks = require('nunjucks');

function createEnv (path, opts) {
    var
        autoescape = opts.autoescape && true, // 控制输出是否被转义
        noCache = opts.noCache || false, // 不使用缓存，每次都重新编译
        watch = opts.watch || false,  // 当模板变化时重新加载
        throwOnUndefined = opts.throwOnUndefined || false, // 当输出为 null 或 undefined 会抛出异常
        
        /**
         * Environment 类用来管理模板，使用他可以加载模板。
         * Environment 时传入两个参数，一组 loaders 和配置项 opts。
         */
        env = new nunjucks.Environment(
            /**
             * 使用加载器 FileSystemLoader 加载模板
             */
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    
    if (opts.filters) {
        for (var f in opts.filters) {
            /**
             * 添加自定义过滤器
             */
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

// 注意 path 的值是从 .vscode 所在文件夹为根目录的
var env = createEnv('use-nunjucks/views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

// var s = env.render('hello.html', {name: '小明<script></script>'});

// console.log('------ first example ------');
// console.log(s);

console.log('\n------ Tag example ------');
console.log(env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
}));

console.log('\n------ Template Inheritance example ------');
console.log('****** parent template ******')
console.log(env.render('base.html', {
    name: 'parentTemplate'
}));

console.log('\n****** child template ******')
console.log(env.render('extend.html', {
    name: 'childTemplate',
    header: 'Hello',
    body: 'bla bla bla...'
}));