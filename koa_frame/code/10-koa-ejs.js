const koa=require('koa');
const pathlib=require('path');
const ejs=require('koa-ejs');

let server=new koa();
server.listen(8888);

ejs(server, {
  root:     pathlib.resolve('template'),
  layout:   false,
  viewExt:  'ejs'
});

server.use(async ctx=>{
  await ctx.render('ejs_template', {
    name: 'blue',
    age: 18
  });
});
