//将原来feedback改成用express框架

var url = require('url')
var express = require('express')
//引入中间件
var bodyParser = require('body-parser')
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


// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express();

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app
	//引入模板
	.engine('html', require('express-art-template'))


/*这里是GET方式提交的表单处理
	.get('/pinglun',function(req,res){
		//添加评论
		var comment = req.query
		comment.dateTime = '2018-11-17 96:11:06'
		comments.unshift(comment)
		//重定向
		res.redirect('/')
	})
*/
	.get('/',function(req,res){
		res.render('index.html',{
			title:'test',
			comments:comments
		})
	})
	
	.get('/post',function(req,res){
		res.render('post.html')
	})

	/*获取POST提交的数据*/
     // 当以 POST 请求 /post 的时候，执行指定的处理函数
     // 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
	.post('/post',function(req,res){

  		// req.query 只能拿 get 请求参数
  	    /*可以通过req.body来获取表单POST请求体数据*/
		var comment = req.body	
  		//console.log(req.query)

		comment.dateTime = '2018-11-17 96:11:06'
		comments.unshift(comment)
		//重定向
		res.redirect('/')
	
	})
	.use('/public',express.static('./public/'))

	app.listen(8888,function(){
		console.log('running...')
	})
