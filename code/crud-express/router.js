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

var router = express.Router()

router.get('/',function(req,res){
	res.render('index.html',{
		Test: [
        '坚信',
        '理想',
        '奋斗',
        '信心2'
      ]
	})
})


module.exports = router