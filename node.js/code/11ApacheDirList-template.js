/*实验目的：读取文件'dir-tpl.html'并对文件进行模板渲染
  类似Apache服务器一样，访问路径不存在或根目录没有index.html时，显示访问目录
  本文要用到一个效果网页'dir-tpl.html'，你不需要关注样式，不在乎文件时间，只要把文件名改为模板格式就行\
//获取dir-tpl.html的方法是：打开浏览器，将本地一目录文件拖到浏览器中，F12获取源码即可
  最后的显示结果可以再优化，这里不再继续了。。*/

var http = require('http')
var fs = require('fs')
var template = require('art-template')

var server = http.createServer()

//设置默认可访问路径
var wwwDir = './testFile'

server.on('request', function (req, res) {
  var url = req.url;
  //读文件
  fs.readFile(wwwDir+'/dir-tpl.html',function(err,data){
    if(err){
      return res.end('404 Not Found.')
    }
    //访问目录
    fs.readdir(wwwDir,function(err,files){
      if(err){
        return res.end('Cannot find dirctory.')
      }
      /*重点来了：
      因为dir-tpl.html里面需要对目录进行渲染，
      html里面的内容不管，找到目录文件files替换为本次访问目录获取到的文件files即可。
      */
      //这里的变量data是页面的内容，上面变量files是读取到的文件列表内容
      var filesStr = template.render(data.toString(),{
        title:'我来渲染啦',
        filelist: files,
        href:'./testFile',
        dir:wwwDir
      })
      // 3. 发送解析替换过后的响应数据
      res.end(filesStr)
    })
  })

})

// 3. 绑定端口号，启动服务
server.listen(8888, function () {
  console.log('running...')
})
