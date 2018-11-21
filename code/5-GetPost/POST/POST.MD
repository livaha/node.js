

#### Post请求--中间件

数据比较多，POST比较合适

在Express中没有内置获取表单POST请求体的API，这里我们需要引入第三方包：body-parser.

http://expressjs.com/en/resources/middleware.html  这官方网站里面，选择body-parser中间件查看文档

1 安装

~~~shell
npm install body-parser
~~~

2 API

~~~shell

# 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
# parse application/x-www-form-urlencoded
var bodyParser = require('body-parser')
~~~

3 Examples

~~~javascript
/*配置----------------------------------*/
var express = require('express')
//引包
var bodyParser = require('body-parser')

var app = express()

/*配置body-parser
 	只要加入这个配置，则在req请求对象上会多出来一个属性：body
 	也就是说你可以直接通过req.body来获取表单POST请求体数据了*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*使用----------------------------------*/
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  /*可以通过req.body来获取表单POST请求体数据*/
  res.end(JSON.stringify(req.body, null, 2))
})
~~~



