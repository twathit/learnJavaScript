'use strict'
var fs = require("fs");
var rs = fs.createReadStream("test.txt");
var ws = fs.createWriteStream("test1.txt");
function step1(){
    var p = new Promise(function(resolve, reject){
        rs.pipe(ws);
        //resolve('step1 done');    --version 1.0
        rs.on('end',resolve("step1 done"));
    });
    return p;
}

function step2(){
    var p = new Promise(function(resolve, reject){
        fs.stat("test1.txt", function(err, stat){
            if (err) {
                console.log(err);
            } else {
                resolve(stat.size);
            }
        });
    });
    return p;
}

step1().then(function(data){
    console.log(data);
}).then(step2).then(function(data){
    console.log(data);
});
//如果前一个回调函数返回的是Promise对象，这时后一个回调函数就会等待该Promise对象有了运行结果，才会进一步调用。
//version 1.0 step1里的resolve并没有在事件触发后调用，所以没等读完直接执行。
//version 1.1 step1里的resolve是在读完毕之后触发，而后step2开始执行，但此时还未写？，所以读出文件大小为0.