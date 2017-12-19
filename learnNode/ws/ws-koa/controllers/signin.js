/// <reference path="C:/Users/Administrator/typings/index.d.ts" />
var index=0;

var get_signin=async (ctx,next)=>{
    let names='红橙黄绿青蓝紫';
    let name=names[index % 7]; 
    ctx.render('signin.html',{
        name:`小${name}`
    });
};

var post_signin=async (ctx,next)=>{
    index ++;
    let name=ctx.request.body.name || '小红';
    let user={
        id:index,
        name:name,
        image:index % 10
    };
    let value=Buffer.from(JSON.stringify(user)).toString('base64');
    console.log(`Set cookie value: ${value}`);
    ctx.cookies.set('name',value);
    ctx.response.redirect('/');
};

var signout=async (ctx,next)=>{
    ctx.cookies.set('name','');
    ctx.response.redirect('/signin');
};

module.exports=[{
    method:'GET',
    path:'/signin',
    func:get_signin
},
{
    method:'POST',
    path:'/signin',
    func:post_signin
},
{
    method:'GET',
    path:'/signout',
    func:signout
}];