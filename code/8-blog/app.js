var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')
var session = require('express-session')

var app = express()

app.engine('html',require('express-art-template'))

app.use('/public',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'../node_modules')))

//默认会去项目中的 views 目录查找该模板文件
app.set('views',path.join(__dirname,'./views/'))

/*配置body-parser*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.listen(8888,function(){
	console.log('running ... 8888')
})
