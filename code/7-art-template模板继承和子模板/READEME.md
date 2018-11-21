查看官方文档： https://aui.github.io/art-template/docs/syntax.html#Template-inheritance

## 子模板

**标准语法**

```
{{include'./header.art'}} 
{{include'./header.art'data}}
```

**原始语法**

```
< ％ 包括（ ' / header.art '）％> 
< ％ 包括（' 。 / header.art '，数据）％>
```

1. `data`值是`$data`默认值。标准语法不支持声明`object`和`array`引用变量。但是，原始语法没有限制。

2. art-template有内置的HTML minifier，请避免在子模板中编写异常的结束标记。否则，当`minimize`选项打开时，标签可能会意外地“优化” 。

   

## 模板继承

**标准语法**

```
{{extend'./layout.art'}} 
{{ block'head'} } ... {{/ block}}
```



模板继承允许您构建包含站点公共部分的基本模板“骨架”。例：

```
<！ -  layout.art  - > 
<！doctype html> 
< html > 
< head > < meta charset = “utf-8” > < title > {{ block'title '}}我的网站{{/ block}} </ title >
     
    

    {{block'head'}} < link rel = “stylesheet” href = “main.css” >     {{/ block}} </ head > < body >     {{block'content'}} {{/ block}} </ body > </ html >
      
```

```
<！ -  index.art  - >
 {{extend'./layout.art'}}

{{block'title'}} {{title}} {{/ block}}

{{block'head'}} < link rel = “stylesheet” href = “custom.css” > {{/ block}}
      


{{block'content'}} 
< p >这只是一个很棒的页面。</ p >
 {{/ block}}
```

渲染index.art后，将自动应用布局骨架。



#### 实例

layout.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
  {{ block 'head' }}{{ /block }}
</head>
<body>
  {{ include './header.html' }}
  <!-- 留一个坑，将要留给孩子去填坑 -->
  
  {{ block 'content' }}
    <h1>默认内容</h1>
  {{ /block }}

  {{ include './footer.html' }}
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  {{ block 'script' }}{{ /block }}
</body>
</html>

~~~

index.html

~~~html
{{extend './layout.html'}}

{{ block 'head' }}
<style>
  body {
    background-color: skyblue;
  }
</style>
{{ /block }}

{{ block 'content' }}
<div>
  <h1>index 页面填坑内容</h1>
</div>
{{ /block }}

{{ block 'script' }}
<script>
  window.alert('index 页面自己的 js 脚本')
</script>
{{ /block }}

~~~

header.html

~~~html
<div>
  <h1>公共的头部</h1>
</div>
~~~

footer.html

~~~html
<div>
  <h1>公共的底部</h1>
</div>
~~~





