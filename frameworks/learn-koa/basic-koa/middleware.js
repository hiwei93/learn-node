/**
 * 了解 koa2 中 middleware 的相关知识，认识到 middleware 顺序的重要性
 */
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('------I am first middleware------!')
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个 middleware
});

app.use(async (ctx, next) => {
    console.log('------I am second middleware------!')
    const start = new Date().getTime();
    console.log(`start is ${start}`);
    await next();
    const ms = new Date().getTime - start; //耗费时间
    console.log(`Time : ${ms}ms`);
});

app.use(async (ctx, next) => {
    console.log('------I am third middleware------!')
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('app started atport 3000...');