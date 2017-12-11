const Koa=require('koa');
const bodyParser=require('koa-bodyparser');
const controller=require('./controller');
const templating=require('./templating');
const app=new Koa();
const isProduction=process.env.NODE_ENV==='production';

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.url}...`);
    var
        start=new Date().getTime();         //Date方法
        execTime;
    await next();
    execTime=new Date().getTime()-start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});

if (! isProduction){
    let staticFiles=require('./static-files');
    app.use(staticFiles('/static/',__dirname+'/static'));
}

app.use(bodyParser());

app.use(templating('views',{
    noCache:! isProduction,
    watch: ! isProduction
}));

app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');
