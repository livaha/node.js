var mongoose = require('mongoose')

var Schema = mongoose.Schema

//1.连接数据库
//指定的数据库可以不存在 ，当你插入第一条数据后就会自动被创建出来
mongoose.connect('mongodb://localhost/demo')

//2.设计文档结构（表结构）
//字段名称就是表结构中的属性名称
//约束目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
	username:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	email:{
		type:String
	}
})

//3. 将文档结构发布为模型
//	 mongoose.model方法就是将一个架构发布为model
//	 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//				mongoose会自动将大写名词的字符串生成小写复数的集合名称
//				例如这里的User最张立会变为users集合名称
//	 第二个参数：架构Schema
//
//	 返回值：模型  构造函数
var User = mongoose.model('User',userSchema)
/*
//4. 当有了模型构造函数后，就可以使用这个构造函数对users集合中的数据进行增删改查了
// **********************
// #region /新增数据
var admin = new User([{
	username:'admin',
	password:'123456',
	email:'admin@admin.com'
},{
	username:'haemee',
	password:'123456',
	email:'admin@admin.com'
}])

admin.save(function(err,ret){
	if(err){
		console.log('保存失败')
	}
	else{
		console.log('保存成功')
		console.log(ret)
	}
})
*/

// **********************
// #region /查询数据
User.find(function(err,ret){
	if(err){
		console.log('查询失败')
	}
	else{
		console.log('查询成功')
		console.log(ret)
	}
})
/*
User.find({
	email:'admin@admin.com'
},function(err,ret){
	if(err){
		console.log('查询失败')
	}
	else{
		console.log('查询成功')
		console.log(ret)
	}
})

//不加查询参数默认返回第一个
User.findOne(function(err,ret){
	if(err){
		console.log('查询失败')
	}
	else{
		console.log('查询成功')
		console.log(ret)
	}
})


*/

/*
User.remove({
	username:'admin'
},function(err,ret){
	if(err){
		console.log('删除失败')
	}
	else{
		console.log('删除成功')
		console.log(ret)
	}
})



// **********************
// #region /更新数据
User.findByIdAndUpdate('5bf518d90bd5270524608c5d',{
	password:'123456'
},function(err,ret){
	if(err){
		console.log('更新失败')
	}
	else{
		console.log('更新成功')
		console.log(ret)
	}
})
*/