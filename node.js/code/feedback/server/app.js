//建立服务器的第二种写法

var http = require('http')
var fs = require('fs')

http 
	.createServer(function(req,res){
		//路径请求--响应
		var url = req.url;
		if(url === '/'){
			fs.readFile('../client/index-src.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else if(url.indexOf('/public') === 0){
			/*开放../public/中的内容 ，
				以至于可以把请求路径当作文件路径来直接进行读取
				../public/css/xxx.css
				../public/js/xxx.js
				../public/lib/jquery.js
			*/
			/*开放了意味着可以读文件并反回给页面了。  
			所以页面请求这些资源的时候，应该放在public目录中*/
			console.log(url)
			fs.readFile('..'+url,function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else if(url === '/post'){
			/*这里的url跟路径还是有区别的:
			这里的post是a标签中的href提供的;下面的路径是'../client/post.html'是路径，
			因为url资源定位符里面没有.html这些*/
			fs.readFile('../client/post.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else{
			/*这里的url跟路径还是有区别的:
			这里的post是a标签中的href提供的;下面的路径是'../client'+url*/
			fs.readFile('../client/404.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
	})
	.listen(8888,function(){
		console.log('running...')
	})
