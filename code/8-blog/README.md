## Node综合Web案例

#### 1.目录结构



#### 2.设置路由



#### 3.引入POST解析插件



#### 4.配置数据模型（数据库操作）

  creat_time: {
    type: Date,
    default: Date.now      //这里没有直接加()是因为与了后会即刻调用； 这里只是给了一个方法，当new Model的时候，如果你没有传递creat_time，则mongoose就会调用default的值作为默认值
  },



#### 5.数据库操作

或查询

```
 $or: [
         {key1: value1}, {key2:value2}
      ]
```





#### 6.ajax和状态码设置

![1542861572609](assets/1542861572609.png)

#### 7.MD5加密

https://github.com/blueimp/JavaScript-MD5

多层加密 



#### 8.表单同步、异步提交

      表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。
      
        <form id="register_form" method="post" action="/register">
      表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。
    
      后来有人想到了一种办法，来解决这个问题。
