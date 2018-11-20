

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
exports.findById = function(id,callback){
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
		var ret = students.find(function(item){
			return item.id === parseInt(id)
		})
		//console.log(ret)
		callback(null,ret)
	})
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    // 注意：这里记得把 id 统一转换为数字类型,不然数字和字符串会混乱
    student.id = parseInt(student.id)

    // 你要修改谁，就需要把谁找出来
    // EcmaScript 6 中的一个数组方法：find
    // 需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
    var stu = students.find(function (item) {
      return item.id === student.id
    })

    // 这种方式你就写死了，有 100 个难道就写 100 次吗？
    // stu.name = student.name
    // stu.age = student.age

	console.log(student)
	console.log(stu)
    // 遍历拷贝对象
    for (var key in student) {
      stu[key] = student[key]
    }

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}

exports.deleteById = function(id,callback){
	//同上，读文件，取出相应id对应的对象，将移出数组
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
	        // 错误就是把错误对象传递给它
	        return callback(err)
		}

		var students = JSON.parse(data).students

		console.log(students)
		//找出相应下标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})

		//根据下标从数组中删除对应的学生对象
		students.splice(deleteId,1)

		//把对象方法转为字符串
		var fileData = JSON.stringify({
			students:students
		})

		//将字符串保存到文件 中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
