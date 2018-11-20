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
var Student = require('./student-api')

var router = express.Router()



router.get('/students',function(req,res){
	Student.find(function(err,students){
		if(err){
			return res.status(500).send('Server error.')
		}

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

/*点击添加学生后，要渲染的页面*/
router.get('/students/new',function(req,res){
	console.log('new')
	res.render('new.html')
})

/*在new.html提交的表单数据处理*/
router.post('/students/new',function(req,res){
	/*1 获取表单数据
	  2 处理  将数据保存到db.json文件中用以持久化
	  3 发送响应*/
	  console.log(req.body)
	  //var student =  req.body
	  //接收的表单数据对象，调用保存方法
	  //new Student(req.body).save(function(err){
	  Student.save(req.body,function(err){
	  	if(err){
	  		return res.status(500).send('Server error.')
	  	}
	  	/*直接重定向*/
	  	res.redirect('/students')
	  })
})

router.get('/students/edit',function(req,res){
	//渲染数据页面edit.html
	//将数据一一对应去渲染
	console.log(req.query.id)
	Student.findById(req.query.id,function(err,student){
		if(err){
	  		return res.status(500).send('Server error.')			
		}
		res.render('edit.html',{
			student:student
		})
	})



})
/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
  // 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Student.updateById()
  // 3. 发送响应
		console.log(req.body)
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})
/*
router.post('/students/edit',function(req,res){
		console.log(req.body)
	Student.updateById(req.body,function(err){
		if(err){
      		return res.status(500).send('Server error.')
		}
		console.log('hello')
    	res.redirect('/students')	
	})
})
*/
router.get('/students/delete',function(req,res){
	res.render('edit.html')
})

module.exports = router
