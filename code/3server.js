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
	//rsp.end('end is to send data.');


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

/*注意:rsp.end('data')是直接发送数据的了，如果在前面用.end发送了数据，后面再有数据都不会再发送了
	如果想发送多行，可以用rsp.write（'data'）*/