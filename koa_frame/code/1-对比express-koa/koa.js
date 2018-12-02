//官网:https://github.com/koajs/koa#async-functions-node-v76

//var express = require('express')
const Koa = require('koa')

// 2. 创建你服务器应用程序
//var app = express()
const app = new Koa();

/* express自带基本路由功能，但Koa一点也不支持，需要引入路由
app.get('/',function(req,res){
	res.send('hello world')
})
*/

//response
app.use(ctx=>{
	ctx.body = 'hello koa'
})

//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})