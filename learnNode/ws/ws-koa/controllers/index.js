/// <reference path="C:/Users/Administrator/typings/index.d.ts" />
var fn_index=async (ctx,next)=>{
    let user=ctx.state.user;
    if (user){
        ctx.render('room.html',{
            title:user
        });
    }else{
        ctx.response.redirect('/signin');
    }
    
};

module.exports=[
    {
        method:'GET',
        path:'/',
        func:fn_index
    }];