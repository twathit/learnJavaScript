'use strict'
var fs=require('fs');
var rs=fs.createReadStream('test.txt','utf-8');     //官方文档用的是'utf8',但这里用'utf-8'也可以，不知为啥。
rs.on('data',function(chunk){
    console.log('DATA:');
    console.log(chunk);
});
rs.on('end',function(){
    console.log('END');
});
rs.on('data',function(err){
    console.log('ERROR:'+err);
});
/*
var wsl=fs.createWriteStream('test.txt','utf8');
wsl.write('...');
wsl.end();
*/