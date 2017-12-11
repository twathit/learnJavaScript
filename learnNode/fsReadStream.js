'use strict'
var fs=require('fs');
var rs=fs.createReadStream('e:/learnNode/test.txt','utf-8');
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
var wsl=fs.createWriteStream('test.txt','utf-8');
wsl.write()