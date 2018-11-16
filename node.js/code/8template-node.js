/*art-template
实验目的：学会引入模板
学会查看文档：https://aui.github.io/art-template/zh-cn/docs/ 
在使用之前可以过一下这个文档  或者使用到哪些不会的再查一下

 art-template 不仅可以在浏览器使用，也可以在 node 中使用

 安装：
    npm install art-template
    该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中
    node_modules 不要改，也不支持改。

 在 Node 中使用 art-template 模板引擎
 模板引起最早就是诞生于服务器领域，后来才发展到了前端。
 
 1. 安装 npm install art-template
 2. 在需要使用的文件模块中加载 art-template
    只需要使用 require 方法加载就可以了：require('art-template')
    参数中的 art-template 就是你下载的包的名字
    也就是说你 isntall 的名字是什么，则你 require 中的就是什么
 3. 查文档，使用模板引擎的 API

 4 注意，模板渲染只关注模板，不关心内容。 
*/

var fs = require('fs')
//这里需要下载'art-template'包，下载完后引入包名才可用
var template = require('art-template')

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

  	console.log(ret)
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

})

/*

服务器渲染完了后再返回客户端。
模式：
template('script 标签 id'，{对象})
最主要的还是要会查看文档（搜索'art-template'）

核心方法
// 基于模板名渲染模板
template(filename, data);

// 将模板源代码编译成函数
template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
template.render(source, data, options);

循环标准语法

{{each target}}
    {{$index}} {{$value}}
{{/each}}
*/