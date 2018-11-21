var fs = require('fs')
//在ES6中新增了一个API Promise
//Promise 是一个构造函数


console.log(1)

//创建Promise容器
//1. 给别人一个承诺
//promise容器一旦创建，就开始执行里面的代码
var p1 = new Promise(function(resolve,reject){
	console.log(2)
	fs.readFile('./testFile/a.txt','utf8',function(err,data){
		if(err){
			//失败了，承诺容器中的任务失败了
			console.log(err)
			//将容器的Pending状态变为Rejected
			reject(err)
		}else{
			//失败了，承诺容器中的任务成功了
			console.log(3)
			console.log(data)
			//将容器的Pending状态变为Resolved
			resolve(data)
		}
	})
})
console.log(4)

//p1就是许的那个承诺
//当p1成功了  然后（then）做指定的操作
//then方法接收的function就是容器中的resolve函数
//第一个参数为resolve的那个，第二个参数为reject状态
p1.then(function(data){
	console.log(data)
},function(err){
	console.log('读取文件失败了',err)
})