const Koa=require('koa');
const app=new Koa();
const isProduction=process.env.NODE_ENV==='production';

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start=new Date().getTime(),
        execTime;
    await next();
    execTime=new Date().getTime() - start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});

let staticFiles=require('./static-files');
app.use(staticFiles('/static/',__dirname+'/static'));

app.use(async (ctx,next) => {
    if (ctx.request.path==='/'){
        ctx.response.redirect('/static/index.html');
    } else {
        await next();
    }
});

app.listen(3000);
console.log('app started at port 3000...');
