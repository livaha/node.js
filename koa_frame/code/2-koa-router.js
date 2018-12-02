const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()


//注册路由
app.use(router.routes())


//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})

//response
app.use(ctx=>{
	ctx.body = 'hello koaaa'
  //ctx.response.set('a', 12);
  //ctx.response.body={a: 12, b: 55};
})

router
	.get('/user',(ctx,next)=>{
		ctx.body = 'Hello Router!'
	  //ctx.req         原生req对象
	  //ctx.request     封装req对象
		console.log(ctx.request)
		console.log(ctx.req.headers)
	})
	//router.all() 方法用来匹配所有 HTTP 动词
	.all('/*',ctx=>{
		ctx.redirect('/sign-in')
		//Redirect source to destination URL with optional 30x status code.
		ctx.status = 301
 	})

