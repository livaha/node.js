const koa=require('koa');
const pathlib=require('path');
const Pug=require('koa-pug');

let server=new koa();
server.listen(8888);

let pug=new Pug({
  viewPath:   pathlib.resolve('template'),  //模板路径
  app:        server
});

server.use(async ctx=>{
  await ctx.render('pug_template', {a:12});//参数：模板名，数据
});
