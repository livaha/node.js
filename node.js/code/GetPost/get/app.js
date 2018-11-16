//建立服务器的第二种写法

var http = require('http')
var fs = require('fs')
var url = require('url')


http 
	.createServer(function(req,res){
		/*url.parse函数详情见url-model.js*/
		/*使用 url.parse 方法将路径解析为一个方便操作的对象，
		第二个参数为 true 表示直接将查询字符串转为一个对象
		（通过 query 属性来访问）*/
		var parseObj = url.parse(req.url,true);
		/*单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）*/
    	var pathname = parseObj.pathname

		if(pathname === '/'){
			fs.readFile('post.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})			
		}
		/*处理在form表单中，以get方式提交过来的数据
    		post.html中：<form action="/pinglun" method="get">
    		提交后的URL为：http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaa*/
		else if(pathname === '/pinglun'){
			console.log('Start to get message...') 
			/* 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，
			因为我的 pathname 是不包含 ? 之后的那个路径
      		 一次请求对应一次响应，响应结束这次请求也就结束了*/
      		 res.end(JSON.stringify(parseObj.query))
      		 /*得到的解析数据为：
      		 {"name":"aaaa","message":"aaaaaaaaaaa"}*/

		}
		else if(pathname === '/bootstrap.css'){
			fs.readFile('bootstrap.css',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else{
			return res.end('404 Not Found.')
		}
	})
	.listen(8888,function(){
		console.log('running...')
	})
