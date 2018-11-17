##### **README**

这里的代码，都是从code里面copy过来的，code里面是一步步做的，把它放到这个codeSet文档里，只为了浏览时后方便，有忘记的可以查下。codeSet的意思就是代码集（有点托管的意思）。

# codeSet

##### 1file.js	简单的读写文件 

~~~javascript
/* 浏览器中的 JavaScript 是没有文件操作的能力的
 但是 Node 中的 JavaScript 具有文件操作的能力

 fs 是 file-system 的简写，就是文件系统的意思
 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API
 例如：fs.readFile 就是用来读取文件的
 */

//读文件
var fs = require('fs')
fs.readFile('2code.js',function(error,data){
	if(error){
		console.log('读文件失败')
	}else{
		console.log(data.toString())
		console.log(data)
	}
})
//写文件
fs.writeFile('./temp.txt','this is test for writeFile',function(error){
	if(error){
		console.log('write faile!')
	}else{
		console.log('write success!')
	}
})

/*解释上面的例子，以读文件为例：

1. 使用 require 方法加载 fs 核心模块

2. 读取文件
   第一个参数就是要读取的文件路径
   第二个参数是一个回调函数
         

   ```
   成功
     data 数据
     error null
   失败
     data undefined没有数据
     error 错误对象
   ```

   Buffer存储的其实都是二进制数据 0 1
   我们可以通过 toString 方法把其转为我们能认识的字符
   要通过判断 error 来确认是否有错误发生
*/


~~~



##### 2 http.js	    简单的服务器创建

~~~javascript
/*
使用 Node 构建一个 Web 服务器
http 这个模块的职责就是帮你创建编写服务器的，所以使用时要注意引用http模块 
创建服务器主要分为以下步骤：

1. 加载 http 核心模块
2. 使用 http.createServer() 方法创建一个 Web 服务器
   返回一个 Server 实例
3. 客户端请求时响应处理：
   当客户端请求过来，就会自动触发服务器的 request 请求事件，
   然后执行第二个参数：回调处理函数
4. 绑定端口号，启动服务器
*/

// 1. 加载 http 核心模块
var http = require('http');
// 2. 使用 http.createServer() 方法创建一个 Web 服务器
var server = http.createServer();
// 2. 监听 request 请求事件，设置请求处理函数
server.on('request',function(request,response){
	console.log('Get message from client,request path:'+request.url);
	console.log('Cilent address:port is:',request.socket.remoteAddress,request.socket.remotePort);

	response.write('hello nodejs!');
	response.end('end is to send date.');
});
// 3. 绑定端口号，启动服务
server.listen(8888,function(){
	console.log('Star server sucessful! Connet http://127.0.0.1:8888/ to accese. ')
})


/*有个小问题：我的环境下，服务器启动了，但客户端无法连接进来
	查找原因后，发现是'request'单词拼错了 */
~~~



##### 3server.js    客户端请求与服务器响应

~~~
// 1. 加载 http 核心模块
var http = require('http');
// 2. 使用 http.createServer() 方法创建一个 Web 服务器
var server = http.createServer();
// 2. 监听 request 请求事件，设置请求处理函数
server.on('request',function(req,rsp){
	/*请求路径，IP地址，端口号
	 ip 地址用来定位计算机
 	 端口号用来定位具体的应用程序
 	 所有需要联网通信的应用程序都会占用一个端口号*/
	console.log('Get message from client,request path:'+req.url);
	console.log('Cilent address:port is:',req.socket.remoteAddress,req.socket.remotePort);

	//直接 end 的同时发送响应数据
	rsp.write('hello nodejs!\n');
	//rsp.end('end is to send date.');


  // 根据不同的请求路径发送不同的响应结果
  // 1. 获取请求路径
  //    req.url 获取到的是端口号之后的那一部分路径
  //    也就是说所有的 url 都是以 / 开头的
  // 2. 判断路径处理响应
  var url = req.url;
  console.log('request path = '+req.url)

  if(url === '/'){
  	rsp.end('this is index page:\n\
  		you can input path as:person  ,login;\n\
  		or other is not be able to set. ')
  }else if(url === '/login'){
  	rsp.end('login page')
  }else if(url === '/person'){
  	var person = [{
  		name:'haemee',
  		age:20
  	},{
  		name:'json',
  		age:'1'
  	}]
  
    // 响应内容只能是二进制数据或者字符串
  	rsp.end(JSON.stringify(person))
  }else{
  	rsp.end('404 Not Found...\n\
  		you can input path as:person, login;\n\
  		or other is not be able to set. ')
  }

});
// 3. 绑定端口号，启动服务
server.listen(8888,function(){
	console.log('Star server sucessful! Connet http://127.0.0.1:8888/ to accese. ')
})

/*注意:rsp.end('date')是直接发送数据的了，如果在前面用.end发送了数据，后面再有数据都不会再发送了
	如果想发送多行，可以用rsp.write（'date'）*/
~~~









