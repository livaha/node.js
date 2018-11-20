一些问题

1 问：调用save方法的时候，student  学生对象 是怎么传进去的？

~~~javascript
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

//这两个函数不在同一文件内
/*将新添加的数据保存到文件中*/
exports.save = function(student,callback){
	/*1 将db.json中原来的数据students读出为json格式，
	  2 给新的数据添加一个id，并将它添加到students的末尾
	  3 将对象数据保存到数组中*/

	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students;
		//添加唯一id
		student.id = students[students.length - 1].id +1;
		//将用户传递的对象保存到数级中
		students.push(student)
	    console.log(students)
		//将对象数据转换为字符串
		var fileData = JSON.stringify({
			students:students
		})
		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//错误就是把错误对象传给它
				return callback(err)
			}
			//成功就没有错，所以错误对象为null
			callback(null)
		})
	})
}
~~~

