

var fs = require('fs')

var dbPath = './db.json'
/*
function find(err,data){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			console.log('read database file err')
			return express.send('read database file err')
		}
		return JSON.parse(data).students 
	})
}
*/

exports.find = function(callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			console.log('read database file err')
			return callback(err)
		}
		callback(null,JSON.parse(data).students ) 
	})
}

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

//根据Id查找对象并返回
findById = function(student,callback){
	//读文件：将所有的数据拿出来进行对比
/*
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students;

		//ES6中的一个数组方法:find
		//需要接收一个函数作为参数
		//当某个遍历项符合item.id === student.id条件时，
		//find会终止遍历，同时返回遍历项
		var ret = students.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})*/
}

/*修改--更新学生
  通过ID修改并更新*/
exports.updateById = function(student,callback){
	//1 查找ID对应的对象
	//2 将对应的对象修改为传进来的新对象
		//读文件：将所有的数据拿出来进行对比

	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students;

		//ES6中的一个数组方法:find
		//需要接收一个函数作为参数
		//当某个遍历项符合item.id === student.id条件时，
		//find会终止遍历，同时返回遍历项
		var stu = students.find(function(item){
			return item.id === parseInt(student.id)
		})

		//遍历拷贝对象
		for(var key in student){
			stu[key] = student[key]
		}

		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students:students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//错误就把错误对象传递给它
				return callback(err)
			}
			//成功没错，就把错误对象置空
			callback(null)
		})

	})


}
