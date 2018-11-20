
var express = require('express')
var router = require('./router')

var app = express()

app.engine('html',require('express-art-template'))

app.use(router)

app.listen(8888,function(){
	console.log('running 8888')
})