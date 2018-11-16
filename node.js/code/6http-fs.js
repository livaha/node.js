// 1. 结合 fs 发送文件中的数据
// 2. Content-Type
//    http://tool.oschina.net/commons
//    不同的资源对应的 Content-Type 是不一样的
//    图片不需要指定编码
//    一般只为字符数据才指定编码

var http = require('http')
var fs = require('fs')

var server = http.createServer()
server.on('request',function(req,rsp){
	var url = req.url;
	console.log('url='+url)

	if(url === '/'){
		//发送文件内容
		fs.readFile('./testFile/index.html',function(err,data){
			if(err){
				rsp.setHeader('Content-Type','text/plain;charset=utf-8')
				rsp.end('Failed to read file!\n')
			}else{
				rsp.setHeader('Content-Type','text/html;charset=utf-8')
				rsp.end(data)
			}
		})
	}
	else if(url === '/baby'){
		fs.readFile('./testFile/baby.jpg',function(err,data){
			if(err){
				rsp.setHeader('Content-Type','text/plain;charset=utf-8')
				rsp.end('Failed to read file!\n')
			}else{					
		        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
		        // rsp.end() 支持两种数据类型，一种是二进制，一种是字符串
		        // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
				rsp.setHeader('Content-Type','image/jpeg')
				rsp.end(data)
			}
		})		
	}
})

server.listen(8888,function(){
	console.log('Server is running...')
})

/*注意：url获取到的路径是从'/'开始的，所以在判断路径的时候，字符串中要带'/'
如我刚开始出现的bug：输入 http://127.0.0.1:8888/baby  的时候并没有正确显示，
原因是我代码中的判断写成了：if(url === 'baby')
把'/baby' 写成了'baby'  */