/*测试一
const koa=require('koa');
const session=require('koa-session');

let server=new koa();
server.listen(8080);

server.keys=require('./.keys');

server.use(session({}, server));

server.use(async ctx=>{
	//ctx.session
  if(ctx.session['count']){
    ctx.session['count']++;
  }else{
    ctx.session['count']=1;
  }

  ctx.response.body=`这是你第${ctx.session.count}次来访`;
});*/

const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
 
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));
 
app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
 
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  //ctx.body = n + ' views'; //跟下面语句一样
  ctx.response.body=`这是你第${n}次来访`;
});
 
app.listen(8888);
console.log('listening on port 8888');