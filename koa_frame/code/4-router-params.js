const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();

//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})

app
  .use(router.routes())


router
  .get('/users/:user', ctx => {
  	console.log(ctx.params);

  	ctx.response.body='aaa';
  })

//http://localhost:8888/users/a