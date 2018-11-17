//建立服务器的第二种写法

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
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

http 
	.createServer(function(req,res){
		//路径请求--响应
		/*url.parse(url,true)的结果，对照应用
		> url.parse('http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa',true)
		Url {
		  protocol: 'http:',
		  slashes: true,
		  auth: null,
		  host: '127.0.0.1:8888',
		  port: '8888',
		  hostname: '127.0.0.1',
		  hash: null,
		  search: '?name=aaaa&message=aaaaaaaaaaa',
		  query: { name: 'aaaa', message: 'aaaaaaaaaaa' },
		  pathname: '/pinglun',
		  path: '/pinglun?name=aaaa&message=aaaaaaaaaaa',
		  href:
		   'http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa' }
		*/
		var parseObj = url.parse(req.url,true);
		var pathname = parseObj.pathname;

		if(pathname === '/'){
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
		else if(pathname.indexOf('/public') === 0){
			/*开放../public/中的内容 ，
				以至于可以把请求路径当作文件路径来直接进行读取
				../public/css/xxx.css
				../public/js/xxx.js
				../public/lib/jquery.js
			*/
			/*开放了意味着可以读文件并反回给页面了。  
			所以页面请求这些资源的时候，应该放在public目录中*/
			console.log(pathname)
			fs.readFile('..'+pathname,function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else if(pathname === '/post'){
			/*这里的pathname跟路径还是有区别的:
			这里的post是a标签中的href提供的;下面的路径是'../client/post.html'是路径，
			因为url资源定位符里面没有.html这些*/
			fs.readFile('../client/post.html',function(err,data){
				if(err){
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else if(pathname == '/pinglun'){
			//1 将评论追加到数组前面
			/* 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
	         一次请求对应一次响应，响应结束这次请求也就结束了
	         res.end(JSON.stringify(parseObj.query))

	         我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
	         所以接下来要做的就是：
	            1. 获取表单提交的数据 parseObj.query
	            2. 将当前时间日期添加到数据对象中，然后存储到数组中
	            3. 让用户重定向跳转到首页 /
	               当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
  			*/
			var comment = parseObj.query;
			comment.dateTime = 'xx-xx-xx';
			comments.unshift(comment);

			//2 将网页重定向到'/'
			 /* 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

      		     如何通过服务器让客户端重定向？
      		        1. 状态码设置为 302 临时重定向
      		            statusCode
      		        2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      		            setHeader
      		     如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      		     所以你就能看到客户端自动跳转了*/
			res.statusCode = 302;
			res.setHeader('Location','/')

      		res.end()
		}
		else{
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
