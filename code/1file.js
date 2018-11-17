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
          
        成功
          data 数据
          error null
        失败
          data undefined没有数据
          error 错误对象

   Buffer存储的其实都是二进制数据 0 1
   我们可以通过 toString 方法把其转为我们能认识的字符
   要通过判断 error 来确认是否有错误发生
*/