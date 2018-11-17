//设置可访问目录

var http = require('http')
var fs = require('fs')

var server = http.createServer()

//设置默认可访问路径
var wwwDir = './testFile'

server.on('request', function (req, res) {
  var url = req.url

  var filePath = '/index.html'
  //1 如果访问的不是默认路径/，则进入你需要访问的路径
  if (url !== '/') {
    filePath = url
  }

  //默认访问路径为wwwDir下的index.html
  //2 如果文件存在，则显示文件内容；
  fs.readFile(wwwDir + filePath, function (err, data) {
    //3 如果文件不存在，则进入err处理
    if (err) {
      return res.end('404 Not Found.')
    }

    res.end(data)
  })

})

// 3. 绑定端口号，启动服务
server.listen(8888, function () {
  console.log('running...')
})
