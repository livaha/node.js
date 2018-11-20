

var fs = require('fs')

var dbPath = './db.json'
/*
function find(err,data){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			console.log('read database file err')
			return express.send('read database file err')
		}
		return JSON.parse(data).students 
	})
}
*/

exports.find = function(callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			console.log('read database file err')
			return callback(err)
		}
		callback(null,JSON.parse(data).students ) 
	})
}