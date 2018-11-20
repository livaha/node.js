/*
*router.js  路由模块
*职责：
*	处理路由
*	根据不丗的请求方法+请求路径设置具体的请求处理函数
*模块职责单一，不要乱写
*我们划分模块的目的就是为了增强项目代码的可维护性
* 提升开发效率
*
*/

var express = require('express')
var fs = require('fs')

var router = express.Router()

var dbPath = './db.json'

router.get('/',function(req,res){
	var students
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			console.log('read database file err')
			return express.send('read database file err')
		}
		students = JSON.parse(data).students 
		console.log(students.name)

		
		res.render('index.html',{
			Test: [
	        '坚信',
	        '理想',
	        '奋斗',
	        '信心2'
	      ],
	      students:students
		})
	})
})


module.exports = router