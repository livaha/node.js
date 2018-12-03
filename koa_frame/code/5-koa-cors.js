const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors')

let app = new Koa();
let router = new Router();

//app.listen(8888)
app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})

app
  .use(cors())
app
  .use(router.routes())


router
  .get('/json/:test', ctx => {
  	console.log(ctx.params);
  	ctx.response.body={
  		status:0,
  		message:[{
  			user_name:"haemee",
  			add_time:"2018-12-03",
  			content:"json"
  		}]
  	};
  })

  //http://localhost:8888/json/a