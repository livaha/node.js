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