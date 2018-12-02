const Koa = require('koa')
const path = require('path')
const staticCache = require('koa-static-cache')

let app = new Koa()

//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})


//staticCache(dir [, options] [, files])
app.use(staticCache(path.join(__dirname,'public'),{
	maxAge : 365* 24 * 60 * 60
}))

//http://127.0.0.1:8888/index.html