var express = require('express')
var User = require('./models/user')

var md5 = require('blueimp-md5')

var router = express.Router()


router.get('/',function(req,res){
    console.log(req.session.user)
	res.render('index.html',{
		user:req.session.user
	})


})

router.get('/login',function(req,res){
	res.render('login.html')
})

router.post('/login',function(req,res){
	//获取登陆请求表单数据
	//判断邮箱密码是否正确
	//设置session
	var body = req.body
	User.findOne({
			email:body.email,
			password:md5(md5(body.password))
	},function(err,user){
		if(err){
			return res.status(500).json({
				success:false,
				message:'server err'
			})
		}
		if(!user){
			//不存在		
			return res.status(200).json({
				err_code:1,
				message:'Email or Nickname aready exists'
			})
		}
		req.session.user = user
		//在客户端处理重定向的问题

	    res.status(200).json({
	      err_code: 0,
	      message: 'OK'
	    })
	})
})

router.get('/register',function(req,res){
	res.render('register.html')
})

router.post('/register',function(req,res){
	/*1.获取表单注册提交过来的数据
	  2.判断该用户是否存在
	     如果存在，不允许注册
	     如果不存在，注册新用户
	  3.发送新的响应*/
	console.log(req.body)
	var body = req.body
	//查邮箱是否重复,then判断昵称是否重复
	User.findOne({
		$or:[
		{
			email:body.email
		},{
			nickname:body.nickname
		}]
	},function(err,data){
		if(err){
			console.log('err')
			//return res.status(500).send('Server Error')
			return res.status(500).json({
				success:false,
				message:'server err'

			})
		}
		if(data){
			//return res.status(200).send('Email or Nickname aready exists')
			return res.status(200).json({
			err_code:1,
			message:'Email or Nickname aready exists'

			})
		}

		//对密码进行mdd5双重加密
		body.password = md5(md5(body.password))

		//保存记录
		new User(body).save(function(err,user){
			if(err){
				return res.status(500).json({
					err_code:500,
					message:'Server busy,try later...'
				})
			}

			//注册成功，使用Session记录用户的登陆状态
			//req.session.isLogin = true
			req.session.user = user


			//console.log('ok')
			//dataType: 'json' ajax中的这个是要求json格式 才会处理
			//res.status(200),send('ok')
			//express提供一个响应方法：json
			res.status(200).json({
				err_code:0,
				message:'ok'
			})
		})


	})
})

router.get('/logout',function(req,res){
	req.session.user = null
	res.redirect('/login')
})

module.exports = router
