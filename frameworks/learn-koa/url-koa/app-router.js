/**
 * 了解 koa-router 包，用其处理URL请求，本程序主要处理的是 GET 请求
 */
const Koa = require('koa');

// 注意：require('koa-router')返回的是函数
const router = require('koa-router')();

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('------first middleware is running!------')
   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
   await next();
});

/**
 * router 的 GET 方法（POST方法需要koa-bodyparser的支持，具体例子看bodyparser.js）
 */
// add url-router
router.get('/hello/:name', async (ctx, next) => {
    console.log('------first router.get is running!------')
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    console.log('------second router.get is running!------')
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');