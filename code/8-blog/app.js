var express = require('express')
var path = require('path')

var app = express()

app.engine('html',require('express-art-template'))

app.use('/public',express.static(path.join(__dirname,'./public/')))
app.use('node_modules/',express.static(path.join(__dirname,'./node_modules')))

//默认会去项目中的 views 目录查找该模板文件
app.set('views',path.join(__dirname,'./views/'))

app.get('/',function(req,res){
	res.send('hello')
})

app.listen(8888,function(){
	console.log('running ... 8888')
})
