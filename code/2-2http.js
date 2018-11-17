//建立服务器的第二种写法

var http = require('http')
var fs = require('fs')

http 
	.createServer(function(req,res){
		res.end('hello')
	})
	.listen(8888,function(){
		console.log('running...')
	})
