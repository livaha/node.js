
var express = require('express')
var router = require('./router')

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser')

var app = express()


/*配置body-parser
 	只要加入这个配置，则在req请求对象上会多出来一个属性：body
 	也就是说你可以直接通过req.body来获取表单POST请求体数据了*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))

app.use(router)

app.listen(8888,function(){
	console.log('running 8888')
})