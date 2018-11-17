//将原来feedback改成用express框架

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
var express = require('express')
/*添加模板用来渲染
1 引入模板  -- 先在当前目录下载模板 art-template
2 渲染格式  -- template 需要的数据模板
3 渲染数据  -- 在index.html中以{{}}格式的数据
4 绑定模板与数据 -- 在需要绑定的数据下进行渲染，返回给客户端（浏览器）*/

/*模拟留言板数据*/
var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]


// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express();
app
	.engine('html', require('express-art-template'))

	.get('/pinglun',function(req,res){

	})

	.get('/',function(req,res){
		res.render('index.html',{
			title:'test'
		})
	})
	.use('/public',express.static('./public/'))
	.use('/post',express.static('./views/post.html'))



	app.listen(8888,function(){
		console.log('running...')
	})
