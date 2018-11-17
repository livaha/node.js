#### 模块原理

+ 通信规则
  + 加载require
  + 导出exports
+ exports等同于module.exports，
  + module.exports是一个对象，exports是module.exports的一个引用，改变了exports的指向，对module.exports并没有任何影响。
+  导出成员的方法
  + 导出多个成员：exports.xxx = xxx
  +  导出多个成员也可以：module.exports = {                        }
  + 导出单个成员：module.exports



#### require标识符分析

+ 自定义模块

 require('./foo.js')

 一定得用路径形式的模块：
  ./ 当前目录，不可省略
  ../ 上一级目录，不可省略

+  核心模块的本质也是文件

 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
 require('fs')
 require('http')

+  第三方模块

 凡是第三方模块都必须通过 npm 来下载
 使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
 不可能有任何一个第三方包和核心模块的名字是一样的
 既不是核心模块、也不是路径形式的模块

 ***注意：我们一个项目有且只有一个 node_modules，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包。 不会出现有多个 node_modules。***

+ 模块查找机制

​    优先从缓存加载
    核心模块
    路径形式的文件模块
    第三方模块
      node_modules/art-template/
      node_modules/art-template/package.json
      node_modules/art-template/package.json main
      index.js 备选项
      进入上一级目录找 node_modules
      按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx
    一个项目有且仅有一个 node_modules 而且是存放到项目的根目录



#### npm与package.json文件



+  npm init -y    跳过设置，如果想设置可以写npm init

初始化会后产生一个package.json文件

~~~
{
  "name": "package-use",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
~~~

+ package.json是一个类似说明书一样的文件 ，我们主要关注 dependencies，它里面是依赖项信息

+ 比如node_modules/art-template/package.json 文件中的 main 属性
      main 属性中就记录了 art-template 的入口模块
      然后加载使用这个第三方包
      实际上最终加载的还是文件
      如果 package.json 文件不存在或者 main 指定的入口模块是也没有
      则 node 会自动找该目录下的 index.js
      也就是说 index.js 会作为一个默认备选项

+ npm install [pkg] --save     下载了包之后，会产生新的信息，保存在package.json文件里，主要是要加参数  --save

+ 有了package.json，如果node_modules删除了也不用担心，

  用npm install       直接通过package.json，找到它的依赖项，一个一个自动下载下来

  

+ npm 网站有很多包，包名是什么，下载就带什么名

  通过npm下载就可以使用

  npm常用命令可搜索

  npm init   /   npm init -y (可跳过向导快速生成)

  npm install   直接下载  package.json文件中的dependencies的依赖

  npm install [pkg]

  npm install --save [pkg]   下载并保存依赖项 package.json文件中的dependencies选项

  npm --help  

  npm uninstall --help

+ 

  npm被墙的问题（下载速度会慢）

  所以可以用淘宝镜像  cnpm

  http://npm.taobao.org     怎么使用可以搜索

  npm   install --global cnpm

  接下来将npm替换成cnpm命令即可

  + npm   install --global cnpm

  + 如果又不想安装cnpm  ,又想使用淘宝的服务器来下载,可以设置参数像下面这样配置，配置完后，以后所有的npm install都会默认通过淘宝的服务器来下载

    ~~~shell
    #一次性的手动添加参数
    npm install jquery --registry=https://registry.npm.taobao.org
    #将参数添加到npm配置中
    npm config set registry https://registry.npm.taobao.org
    #查看配置信息
    npm config list
    #设置前：metrics-registry = "https://registry.npmjs.org/"
    #设置后：metrics-registry = "https://registry.npm.taobao.org/"
    ~~~

    




