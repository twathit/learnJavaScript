/// <reference path="C:/Users/Administrator/typings/index.d.ts" />
var fn_index=async (ctx,next)=>{
    ctx.render('index.html',{
        title:'Welcome'
    });
};

var fn_signin=async (ctx,next)=>{
    var 
        email=ctx.request.body.email||'',
        password=ctx.request.body.password||'';
    console.log(`signin with name: ${email},password: ${password}`);
    if (email==='tw@top.com'&&password==='12345'){
        console.log('signin ok!');
        ctx.render('signin-ok.html',{
            title:'Sign in OK',
            name:'Mr Node'
        });
    } else{
        console.log('signin failed!');
        ctx.render('signin-failed.html',{
            title:'Sign in Failed'
        });
    }
};

module.exports=[
    {
        method:'GET',
        path:'/',
        func:fn_index
    },
    {
        method:'POST',
        path:'/signin',
        func:fn_signin
    }
];