#### 1.安装的环境变量

安装完后，将对应的bin目录添加到环境变量中

#### 2. 启动和关闭数据库

启动：

~~~shell
#mongodb默认使用执行mongod命令所处盘符根目录下的/data/db作为自己的数据存储目录
#所以在第一次执行该命令之前先自己动手新建一个/data/db
mongod
~~~

如果想要修改默认的数据存储目录，可以：

~~~shell
mongod --dbpath=数据存储目录路径
~~~

#### 3.连接数据库

连接：

~~~shell
#该命令默认连接本机的MongoDB服务
mongo
~~~

退出：

~~~shell
#在连接状态输入exit退出连接
exit
~~~

#### 4.基本命令

+ ```show dbs```
  + 查看显示所有数据库
+ ```use数据库名称```
  + 切换到指定的数据（如果没有会新建）
+ 插入数据库

#### 5.在Node中如何操作MongoDB

学会查文档：

+ 官方的：

  https://www.npmjs.com   输入mongodb  

  找到关于node的，进去后可以查看 ，并且同页有github链接

+ 使用第三方mongoose来操作MongoDB数据库

  第三方包官网：https://mongoosejs.com/

  mongoose基于MongoDB官方的mongodb包再一次做了封装

  ~~~shell
  //官网的一个例子：
  const mongoose = require('mongoose');  //这里需要装 npm i mongoose
  mongoose.connect('mongodb://localhost/test');
  
  const Cat = mongoose.model('Cat', { name: String });
  
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
  ~~~

  

#### 6.mongoose实例

根据mongoose官网文档写demo

https://mongoosejs.com/docs/guide.html



### mongoose

+ 官网：https://mongoosejs.com/
+ 官方指南：https://mongoosejs.com/docs/guide.html
+ 官方API文档：https://mongoosejs.com/docs/api.html

#### 1.MongoDB数据库的基本概念

+ 数据库 --- 可以有多个数据库

+ 集合 --- 一个数据库中可以有多个集合（表）

+ 文档 --- 一个集合中可以有多个文档（表记录）

+ 文档结构很灵活，没有任何限制

+ MongoDB非常灵活，不需要像MySQL一样先创建数据库，表，设计表结构

  + 在这里只需要：当你需要插入数据的时候，只需要指定住哪个数据库的哪个集合操作就可以了
  + 一切都由MongoDB来帮你自动完成建库建表这件事

  ~~~javascript
  {
    qq:{
      users:[
        {name:'张三',age:14},
        {name:'张三',age:14},
        {name:'张三',age:14}
      ],
      products:[
        
      ],
      ...
    },
    taobao:{
      ...
    }
    
  }
  ~~~

  

#### 2.起步

+ 安装：

~~~shell
npm i mongoose
~~~

(使用的时候 请保持数据库服务是在启动状态 )

+ demo1:  hello world:

~~~javascript
//官网的一个例子：
//连接MongoDB数据库
mongoose.connect('mongodb://localhost/test');

//创建一个模型
//就是在设计数据库
//MongoDB是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
//mongoose这个包就可以让你的设计编写过程变的非常的简单
const Cat = mongoose.model('Cat', { name: String });

//实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));

//可用下面语句查询
//use test
//show collections
// db.cats.find()

~~~

#### 3.官方指南

##### 3.1设计Scheme发布Model

~~~javascript
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

//4. 当有了模型构造函数后，就可以使用这个构造函数对users集合中的数据进行增删改查了
~~~

#####  3.2添加数据

~~~javascript
//4. 当有了模型构造函数后，就可以使用这个构造函数对users集合中的数据进行增删改查了
//#region新增数据
var admin = new User({
	username:'admin',
	password:'123456',
	email:'admin@admin.com'
})

admin.save(function(err,ret){
	if(err){
		console.log('保存失败')
	}
	else{
		console.log('保存成功')
		console.log(ret)
	}
})

~~~

##### 3.3查询

查询所有：

~~~javascript
User.find(function(err,ret){
	if(err){
		console.log('查询失败')
	}
	else{
		console.log('查询成功')
		console.log(ret)
	}
})
~~~

按条件查询所有：

~~~javascript
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
~~~

按条件查询单个：

~~~javascript
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

~~~



##### 3.4删除

~~~javascript

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
~~~

根据条件删除一个：

```
Model.findOneAndRemove(conditions,[options],[callback])
```

根据id删除一个：

```
Model.findByIdAndRemove(id,[options],[callback])
```



##### 3.5更新

根据条件更新所有：

```
Model.update(conditions,doc,[option],[callback])
```

根据指定条件更新一个：

```
Model.findOneAndUpdate([conditions],[update],[options],[callback])
```

根据id更新一个：

~~~javascript
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
~~~



