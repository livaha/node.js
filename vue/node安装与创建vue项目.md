1 安装node.js软件

2 在cmd下确保node ,npm能用（可以修改一下cmd的属性，使能自由复制粘贴）

   node -v  

   npm -v

3 安装淘宝镜像cnpm;  根据说明https://npm.taobao.org/ ，将npm镜像替换为cnpm镜像（这样会更快些）

4 下载vue-cli   :   cnpm install vue-cli -g

​    vue -V   ; vue list 查看模板方案

5 vue init webpack vuedemo3      开始一个项目（一路下来可以都选择no）

​    cd vuedemo3      ;cnpm install   ;     在vuedemo3目录下面安装，会有node_modules这个文件夹

6 npm run dev  ;  跑node.js的命令

​    页面自动跳出来，或者有一个手动链接http://localhost:8080/#/

7 修改../vuedemo3/src/App.vue  里面的文件，  

​    就可以看到http://localhost:8080/#/ 里面的内容改变

8 npm run build   ;生成部署的文件 ，会多了个dist目录

​    dist里面有打包好的代码   .map文件是用于调试的

9 开发主要在src目录下

   config /build  主要是一些配置，如生产环境为开发、测试都是在这配置的

​    还有webpack的配置等 

​    node_modules 主要是一些依赖，如vue等都从这获取



