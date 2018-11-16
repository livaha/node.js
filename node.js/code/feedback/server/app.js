//建立服务器的第二种写法

var http = require('http')
var fs = require('fs')

/*添加模板用来渲染
1 引入模板  -- 先在当前目录下载模板 art-template
2 渲染格式  -- template 需要的数据模板
3 渲染数据  -- 在index.html中以{{}}格式的数据
4 绑定模板与数据 -- 在需要绑定的数据下进行渲染，返回给客户端（浏览器）*/
var template = require('art-template')

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

http 
	.createServer(function(req,res){
		//路径请求--响应
		var url = req.url;
		if(url === '/'){
			fs.readFile('../client/index.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				/*对数据进行渲染*/
				var htmlStr = template.render(data.toString(),{
					comments:comments
				})
				/*将渲染后的数据返回给客户端*/
				res.end(htmlStr)
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
