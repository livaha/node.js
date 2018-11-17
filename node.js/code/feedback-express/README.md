**nodemon**

https://github.com/aui/art-template  仓库

https://aui.github.io/art-template/   art-template 官方文档



查看art-template官方文档，与express结合如何使用

1 安装

~~~ shell
npm install --save art-template
npm install --save express-art-template
~~~



2 引入模板Example

~~~javascript
var express = require('express');
var app = express();
app.engine('art', require('express-art-template'));	//核心代码
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
~~~

