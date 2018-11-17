/*还是模板渲染
基于文件8和2的内容，使其在服务器端输出。 
这样可以看到在网页中的变化了*/
var fs = require('fs')
//这里需要下载'art-template'包，下载完后引入包名才可用
var template = require('art-template')

// 1. 加载 http 核心模块
var http = require('http');
// 2. 使用 http.createServer() 方法创建一个 Web 服务器
var server = http.createServer();
// 2. 监听 request 请求事件，设置请求处理函数
server.on('request',function(request,response){


	fs.readFile('./testFile/tpl.html',function(err,data){
		if(err){
			return console.log('File read failed.')
		}
		/*进行模板渲染*/
		var ret = template.render(data.toString(),{
			title:'个人信息',
			name:'Jack',
			age:12,
			province:'YUE',
			hobbies:[
				'eat',
				'sleep',
				'da dou dou'
			]
		})

	  	return response.end(ret)
	})

});
// 3. 绑定端口号，启动服务
server.listen(8888,function(){
	console.log('Star server sucessful! Connet http://127.0.0.1:8888/ to accese. ')
})


	/**tpl.html内容：
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>{{ title }}</title>
	</head>
	<body>
	  <p>大家好，我叫：{{ name }}</p>
	  <p>我今年 {{ age }} 岁了</p>
	  <h1>我来自 {{ province }}</h1>
	  <p>我的爱好：{{each hobbies}} {{ $value }} {{/each}}</p>
  	  <p>我喜欢：{{each projects}} {{ $index }} - {{ $value }} {{/each}}</p>	  <script>
	    var foo = '{{ title }}'
	  </script>
	</body>
	</html>*/

