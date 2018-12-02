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





