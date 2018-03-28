//深入理解闭包

var test=(function(){
  var val = 0;
  return function(){
    return val++;
  }
}());
for (var i=0;i<4;i++){
  test();
}
console.log(test());

//output:4

function test(){
  var data=[],i;
  for (i=0;i<4;i++){
    data[i]=function(){
      console.log(i);
    }
  }
  return data[0];
}
test()();

////output:4