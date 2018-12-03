# KOA

一个跟express类似的框架 

https://github.com/koajs/koa



### Installation

Koa requires **node v7.6.0** or higher for ES2015 and async function support.

```
$ npm install koa --save
```

### Hello Koa

```
const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```



# koa-router

https://github.com/alexmingoia/koa-router



## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install koa-router
```

**Example**
Basic usage:

```
var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```





# koa-static-cache

https://github.com/koajs/static-cache

**用koa-static-cache代替koa-static，可以减少加载文件大小**

## Installation

```
$ npm install koa-static-cache
```

## API

### staticCache(dir [, options][, files])

```
var path = require('path')
var staticCache = require('koa-static-cache')

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 24 * 60 * 60 
}))
```



# koa-cors

解决跨域请求

CORS middleware for Koa

Inspired by the great [node-cors](https://github.com/troygoode/node-cors) module.

## Installation (via [npm](https://npmjs.org/package/koa-cors))

```
$ npm install koa-cors
```

## Usage

```
var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');
var app = koa();
 
app.use(cors());
 
app.use(route.get('/', function() {
  this.body = { msg: 'Hello World!' };
}));
 
app.listen(3000);
```







# koa-better-body 

https://github.com/tunnckoCoreLabs/koa-better-body

## Install

```
npm i koa-better-body --save
```

## Usage

> For more use-cases see the [tests](https://github.com/tunnckoCoreLabs/koa-better-body/blob/master/test.js)

```
const koaBetterBody = require('koa-better-body')
```

### [koaBetterBody](https://github.com/tunnckoCoreLabs/koa-better-body/blob/master/index.js#L40)

> Robust body parser for [koa](https://github.com/koajs/koa)@1, also works for `koa@2` (with deprecations). Will also work for future `koa@3` with [koa-convert](https://github.com/gyson/koa-convert).

**Params**

- `options` **{Object}**: see more on [options section](https://github.com/tunnckoCoreLabs/koa-better-body#options)
- `returns` **{GeneratorFunction}**

**Example**

```
var koa = require('koa')
var body = require('koa-better-body')
var app = koa()

app
  .use(body())
  .use(function * () {
    console.log(this.request.body)    // if buffer or text
    console.log(this.request.files)   // if multipart or urlencoded
    console.log(this.request.fields)  // if json
  })
  .listen(8080, function () {
    console.log('koa server start listening on port 8080')
  })
```



# koa-convert

http://npm.taobao.org/package/koa-convert

## Note

It should be able to convert any legacy generator middleware to modern promise middleware ( or convert it back ).

Please let me know ( send a issue ) if you fail to do so.

## Installation

```
$ npm install koa-convert
```

## Usage

```
const Koa = require('koa') // koa v2.x
const convert = require('koa-convert')
const app = new Koa()

app.use(modernMiddleware)

app.use(convert(legacyMiddleware))

app.use(convert.compose(legacyMiddleware, modernMiddleware))

function * legacyMiddleware (next) {
  // before
  yield next
  // after
}

function modernMiddleware (ctx, next) {
  // before
  return next().then(() => {
    // after
  })
}
```







