var url = require('url')

var objfalse = url.parse('http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa')

var objtrue = url.parse('http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa', true)

console.log(objfalse)
console.log(objfalse.query)

console.log(objtrue)
console.log(objtrue.query)

/*get 主要是将数据以URL的方式发送
post 是以集合的方式

url.parse(url,true) 这里的true主要区别在query参数
如下面的执行结果，参数为false则输出字符串形式：
  query: 'name=aaaa&message=aaaaaaaaaaa',
  如果参数为true，则输出为json格式对象：
  query: { name: 'aaaa', message: 'aaaaaaaaaaa' },
*/

/*下面是执行结果
F:\GitHub\web\node.js\code\GetPost\get>node url-model.js
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: '127.0.0.1:8888',
  port: '8888',
  hostname: '127.0.0.1',
  hash: null,
  search: '?name=aaaa&message=aaaaaaaaaaa',
  query: 'name=aaaa&message=aaaaaaaaaaa',
  pathname: '/pinglun',
  path: '/pinglun?name=aaaa&message=aaaaaaaaaaa',
  href:
   'http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa' }

name=aaaa&message=aaaaaaaaaaa

Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: '127.0.0.1:8888',
  port: '8888',
  hostname: '127.0.0.1',
  hash: null,
  search: '?name=aaaa&message=aaaaaaaaaaa',
  query: { name: 'aaaa', message: 'aaaaaaaaaaa' },
  pathname: '/pinglun',
  path: '/pinglun?name=aaaa&message=aaaaaaaaaaa',
  href:
   'http://127.0.0.1:8888/pinglun?name=aaaa&message=aaaaaaaaaaa' }

{ name: 'aaaa', message: 'aaaaaaaaaaa' }

*/