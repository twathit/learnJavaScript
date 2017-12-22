module.exports=[{
    method:'GET',
    path:'/',
    func:async (ctx,next)=>{
        ctx.render('index.html')
    }
}]