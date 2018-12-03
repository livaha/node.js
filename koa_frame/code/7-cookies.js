const koa = require('koa')

let app = new koa()

//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})

app.use(ctx=>{
	//F12设置的cookies,name=a,value=4;
	//ctx.cookies.get(name, [options])
	console.log(ctx.cookies.get('a'))

	//这里设置的，可以通过F12去查看cookies值
	//ctx.cookies.set(name, value, [options])
	ctx.cookies.set('b',5,{
		maxAge:365* 24 * 60 * 60
	})

	ctx.response.body='aa'
})