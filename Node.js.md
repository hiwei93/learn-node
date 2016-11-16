# Node.js

## 一、模块

``` javascript
module.exports = greet;
```
把函数`greet`作为模块的输出暴露出去，使其他模块就可以使用`greet`函数。

引入`hello`模块用`Node`提供的`require`函数：
``` javascript
var greet = require('./hello');
```

## 二、基本模块

### 1. global

>Node.js的全局对象

### 2. process

>Node.js提供的对象，代表当前Node.js进程

### 3. 文件系统模块`fs`

>`fs`模块负责读写文件，同时提供同步和异步方法。

#### 1. 读取文件

引入`fs`模块：
``` javascript
var fs = require('fs');
```
**异步方法：**
1. 读取文本文件
``` javascript
fs.readFile(fileName, code, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```
- fileName: 读取的文件路径和文件名；
- code: 文件编码方式；
- function: 回调函数，第一个参数`err`代表错误信息，第二个参数`data`代表结果。

2. 读取二进制文件（如图片）
``` javascript
fs.readFile(fileName, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
```
- 回调函数的`data`参数将返回一个`Buffer`对象;
``` javascript
// Buffer -> String
data.toString('utf-8');
// String -> Buffer
new Buffer(text, 'utf-8');
```

**同步方法：**
``` javascript
try {
    var data = fs.readFileSync(fileName, code);
    console.log(data);
} catch (err) {
    console.log(err);
}
```



#### 2.写文件

引入`fs`模块：
``` javascript
var fs = require('fs');
```
**异步方法：**
写文本文件
``` javascript
fs.writeFile(fileName, data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
```
- data: 写入的数据。

**同步方法：**
``` javascript
try {
    var data = 'test Sync!'
    fs.writeFileSync(fileName, data);
    console.log('The file is writed!');
} catch (err) {
    console.log(err);
}
```

#### 3.获取文件信息

引入`fs`模块：
``` javascript
var fs = require('fs');
```
**异步方法：**
``` javascript
fs.stat(fileName, function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        }
});
```
**同步方法：**
``` javascript
try {
    var stat = fs.statSync(fileName);
    console.log('size: ' + stat.size);
    //是否是文件
    console.log('isFile: ' + stat.isFile());
    //是否是目录
    console.log('isDirectory: ' + stat.isDirectory());
} catch (err) {
    console.log(err);
}
```
### 4.http

>To use the HTTP server and client

1. 导入http模块:
``` javascript
var http = require('http');
```
2. 创建http server，并传入回调函数:
``` javascript
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
	console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
	response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
	response.end('<h1>Hello world!</h1>');
});
```
3. 让服务器监听8080端口:
``` javascript
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
```

### 5.加密算法模块儿`cryto`

>crypto模块提供通用的加密和哈希算法。

## 三、web框架koa

- koa是Express的下一代基于Node.js的web框架，目前有1.x和2.0两个版本。
- 本教程使用的是koa2.0版本，kao2.0基于ES7开发，和koa 1相比，koa2完全使用Promise并配合async来实现异步。
- ES7（目前是草案，还没有发布）引入了新的关键字async和await，可以轻松地把一个function变为异步模式。
- 由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数。

[koa官网](http://koajs.com/)

### 1.导入包

国内用npm下载包速度慢，建改成阿里的镜像：
```
npm --registry=https://registry.npm.taobao.org install cnpm -g
```
然后用`cnpm install`进行下载。
详细看：[使用 cnpm 加速 npm](https://cnodejs.org/topic/5338c5db7cbade005b023c98)

#### 1.导入koa2.0

##### 方法一：用npm命令直接安装koa

在项目根目录下打开命令提示符，输入：
```
npm install koa@2.0.0
```

##### 方法二：创建package.json

在项目根目录下创建一个package.json文件，该文件包含项目的全部信息，其中`"dependencies"`项为项目说用到的报的依赖，如：
``` json
{
    "dependencies": {
        "babel-core": "6.13.2",
        "babel-polyfill": "6.13.0",
        "babel-preset-es2015-node6": "0.3.0",
        "babel-preset-stage-3": "6.5.0",
        "koa": "2.0.0"
    }
}
```
然后，在项目根目录下打开命令提示符，输入：
```
npm install
```
> **推荐使用该方法**

#### 2.导入Babel

因为node.js目前不支持ES7，无法识别新的`async`语法，因此需要安装`Babel`把ES7代码“转换”为ES6代码。

### 2.创建koa工程

1. 导入koa
``` javascript
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
```

2. 创建Koa对象
``` javascript
// 创建一个Koa对象表示web app本身:
const app = new Koa();
```

3. app调用该异步函数处理请求
``` javascript
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```
- ctx是由koa传入的封装了request和response的变量，通过它可以访问request和response；
- next是koa传入的将要处理的下一个异步函数；
- 由async标记的函数称为异步函数，在异步函数中，用await调用另一个异步函数，这两个关键字将在ES7中引入。

4. 监听端口
``` javascript
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
```

#### middleware

- koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
- 调用app.use()的顺序决定了middleware的顺序。

> 强调：middleware的顺序很重要！

- 如果一个middleware没有调用await next()，后续的middleware将不再执行了。

### 3.处理URL

#### koa-router

koa-router这个middleware，负责处理URL映射：
在package.json中添加依赖项：
``` json
"koa-router": "7.0.0"
```

[router在npm上的文档](https://www.npmjs.com/package/koa-router)

##### 1.处理GET请求

1.导入koa-router。
``` javascript
const router = require('koa-router')();
```
> 说明：require('koa-router')返回的是函数，要先进行调用。

2.使用router.get('/path', async fn)来注册一个GET请求。
``` javascript
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
```
> 说明：在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问

3.注册router middleware:
``` javascript
app.use(router.routes());
```

##### 2.koa-bodyparser

koa-bodyparser 解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
在package.json中添加依赖项：
``` json
"koa-bodyparser": "3.2.0"
```

###### 处理POST请求

1.导入koa-bodyparser：
``` javascript
const bodyParser = require('koa-bodyparser');
```

2.注册koa-bodyparser：
``` javascript
app.use(bodyParser());
```
> 说明：koa-bodyparser必须在router之前被注册到app对象上。

3.用router.post('/path', async fn)注册POST请求：
``` javascript
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    ctx.response.body = `...`;
}
    }
```

### 4.模板引擎

可以对照理解JavaEE中的EL表达式。

#### Nunjucks

在package.json中添加依赖项：
```
"nunjucks": "2.4.2"
```
[官方文档](ttp://mozilla.github.io/nunjucks/)
> 此处只介绍本教程所用的API。

导入nunjucks：
``` javascript
const nunjucks = require('nunjucks');
```


##### 1.Environment类

The Environment class is the central object which handles templates.（Environment是模板引擎对象）
实例化Environment：
``` javascript
var env = new nunjucks.Environment([loaders], [opts]);
```
- loaders 可为一个或多个，如果传入一个数组，nunjucks 会按顺序查找直到找到模板。如果 loaders 不存在，则默认从当前目录或地址加载。（在 node 端会使用 FileSystemLoader 加载模板。）
- opts 的配置有 autoescape、throwOnUndefined、trimBlocks 和 lstripBlocks

###### 1.render方法

渲染模板：
```
environment.render(name, [context], [callback])
```
- name：模板名；
- context：渲染模板需要的数据；
- callback：回调函数，异步渲染时使用。一般不写callback，使用同步渲染，
如果 callback 不存在则直接回返字符串结果。


###### 2.addFilter方法

Custom Filters
``` javascript
env.addFilter(name, func)
```
- func：过滤时的一个函数。该函数第一个参数为目标元素，剩下的参数为传入过滤器的参数。
具体例子可看：[Custom Filters](http://mozilla.github.io/nunjucks/cn/api.html#custom-filters)

##### 2.FileSystemLoader类

It will load templates from the filesystem, using the searchPaths array as paths to look for templates. 
实例化FileSystemLoader（与Environment一起使用）：
``` javascript
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader([searchPaths], [opts]));
```
- searchPaths 为查找模板的路径，可以是一个也可以是多个，默认为当前的工作目录。
- opt 为一个对象，包含如下属性：
	- watch ：如果为 true，当文件系统上的模板变化了，系统会自动更新他。
	- noCache ：如果为 true，不使用缓存，模板每次都会重新编译。

## 四、ORM框架Sequelize

在package.json中添加
依赖项：
```
"sequelize": "3.24.1",
"mysql": "2.11.1"
```
[Sequelize的API](http://docs.sequelizejs.com/)

### 1.创建一个sequelize对象实例

引入sequelize包：
``` javascript
const Sequelize = require('sequelize');
```
创建一个sequelize对象实例:
``` javascript
var sequelize = new Sequelize(database, username, 
password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
```

### 2.配置数据映射

定义模型Pet，配置数据映射关系：
``` javascript
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });
```

### 3.数据表操作

#### 1.插入数据

``` javascript
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();
```

#### 2.查询数据

``` javascript
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
})();
```
> 说明：findAll()方法可以接收where、order这些参数，这和将要生成的SQL语句是对应的。

##### 1.更新数据

查询数据返回的对象中有save()方法：
``` javascript
(async () => {
    var p = await findAll();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    await p.save();
})();
```

##### 2.删除数据

查询数据返回的对象中有destroy()方法：
``` javascript
(async () => {
    var p = await findAll();
    await p.destroy();
})();
```

