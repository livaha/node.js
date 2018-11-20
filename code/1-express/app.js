/*官网： http://expressjs.com/en/starter/installing.html
使用express框架有三大步骤
1 查看文档，了解这是什么
2 安装express -- 通过文档安装
3 引用框架
4 使用框架，可在官网查看文档，如何使用API
*/

var express = require('express')
// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express()

//respond with "hello world" when a GET request is made to the homepage
app.get('/',function(req,res){
	res.send('hello world')
})

/*use函数里面的内容表示可以直接被访问  访问方式为： 127.0.0.1:8888/public/js/main.js */
app.use('/public/',express.static('./public/'))
/*省略第一个参数，可以直接通过'/'访问./public/里面的内容  127.0.0.1:8888*/
app.use(express.static('./public/'))


// Express 对于没有设定的请求路径，默认会返回 Cat not get xxx
// 如果你想要定制这个 404
// 需要通过中间件来配置
// 只需要在自己的路由之后增加一个
app.use(function (req, res) {
  // 所有未处理的请求路径都会跑到这里
  // 404
})

app.listen(8888,function(){
	console.log('running...\nPelease use 127.0.0.1:8888 to access..')
})