/**
 * 初识 koa2 ，了解处理请求的一部方法
 */
const Koa = require('koa');

const app = new Koa();

/**
 * 由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数。
 */
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('app started atport 3000...');