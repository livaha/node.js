/*
F:\GitHub\web\koa_frame>npm install koa-better-body --save
npm ERR! code ENOGIT
npm ERR! Error while executing:
npm ERR! undefined ls-remote -h -t https://github.com/tunnckoCore/body-parsers.git
npm ERR!
npm ERR! undefined
npm ERR! No git binary found in $PATH
npm ERR!
npm ERR! Failed using git.
npm ERR! Please check if you have git installed and in your PATH.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\京美电子\AppData\Roaming\npm-cache\_logs\2018-12-03T07_24_46_890Z-debug.log
*/
/*koa-better-body版本太低，因为我将npm配置改为了cnpm的，所以出错了，
将下载命令改成cnpm install koa-better-body --save  就可以了，不知原理 --*/

const koa=require('koa');
const betterBody=require('koa-better-body');
const convert=require('koa-convert');
const pathlib=require('path');

let server=new koa();
server.listen(8888);

server.use(convert(betterBody({
  uploadDir: pathlib.resolve('./upload'),
  //keepExtensions: true
})));

server.use(async ctx=>{
  console.log(ctx.request.fields);
  console.log(ctx.request.files);
	//console.log(this.request.body)    // if buffer or text
	console.log(this.request.files)   // if multipart or urlencoded
	console.log(this.request.fields)  // if json
});

//利用html提交表单，随后再测试
//