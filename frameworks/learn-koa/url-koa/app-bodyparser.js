/**
 * 了解 node.js 与 koa-router 都不提供解析 request 的 body 的功能，处理 POST 方法的数据不方便；
 * 了解 koa-bodyparser 包，其可以解析原始request请求，并将解析后的参数绑定到，ctx.request.body中；
 * 意识到 koa-bodyparser 必须在 router 之前被注册到app对象上。
 * 本程序处理了 GET 和 POST 请求。
 */
const Koa = require('koa');

// 注意：require('koa-router')返回的是函数
const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

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
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with Name : ${name}, Password : ${password}`);
    if(name === 'koa' && password === '123') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`;
    }
});

// koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');