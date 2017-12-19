const url=require('url');
const ws=require('ws');
const Cookies=require('cookies');
const Koa=require('koa');
const bodyParser=require('koa-bodyparser');
const controller=require('./controller');
const templating=require('./templating');
const WebSocketServer=ws.Server;
const app=new Koa();
const isProduction=process.env.NODE_ENV==='production';

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.url}...`);
    var
        start=new Date().getTime(),         //Date方法
        execTime;
    await next();
    execTime=new Date().getTime()-start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});

app.use(async (ctx,next)=>{
    ctx.state.user=parseUser(ctx.cookies.get('name')||'');
    await next();
});
/*
if (! isProduction){
    let staticFiles=require('./static-files');
    app.use(staticFiles('/static/',__dirname+'/static'));
}
*/
let staticFiles=require('./static-files');
app.use(staticFiles('/static/',__dirname+'/static'));

app.use(bodyParser());

app.use(templating('views',{
    noCache:true,//! isProduction,
    watch: true//! isProduction
}));

app.use(controller());
let server=app.listen(3000);

function parseUser(obj){
    if (!obj){
        return;
    }
    console.log('try parse:'+obj);
    let s='';
    if (typeof obj === 'string'){
        s=obj;
    }else if (obj.headers){
        let cookies=new Cookies(obj,null);
        s=cookies.get('name');
    }
    if (s){
        try{
            let user=JSON.parse(Buffer.from(s,'base64').toString());        //cookie采用base64编码，toString默认'utf-8'编码，JSON还定死了字符集必须是UTF-8
            console.log(`User:${user.name},ID:${user.id}`);
            return user;
        }catch (e){
            console.log('Error：'+e);
        }
    }
}

function createWebSocketServer(server,onConnection,onMessage,onClose,onError){
    let wss=new WebSocketServer({
        server:server
    });
    //broadcast to all
    wss.broadcast=function broadcast(data){
        wss.clients.forEach(function each(client){
            client.send(data);
        });
    };
    onConnection=onConnection||function(){
        console.log('[WebSocket] connected.');
    };
    onMessage=onMessage||function(msg){
        console.log('[WebSocket] message received:'+msg);
    };
    onClose=onClose||function(code,message){
        console.log(`[WebSocket] closed:${code}-${message}`);
    };
    onError=onError||function(err){
        console.log('[WebSocket] error:'+err);
    };
    wss.on('connection',function(ws,req){
        let location=url.parse(req.url,true);       //ws 3.0以后移除了upgradeReq
        console.log('[WebSocketServer] connection:'+location.href);
        ws.on('message',onMessage);
        ws.on('close',onClose);
        ws.on('error',onError);
        if (location.pathname !== '/ws/chat'){
            ws.close(4000,'Invalid URL');
        }
        let user=parseUser(req);
        if (!user){
            ws.close(4001,'Invalid user');
        }
        ws.user=user;
        ws.wss=wss;
        onConnection.apply(ws);
    });
    console.log('WebsocketServer was attached.');
    return wss;
}

var messageIndex=0;

function createMessage(type,user,data){
    messageIndex++;
    return JSON.stringify({
        id:messageIndex,
        type:type,
        user:user,
        data:data
    });
}
//connect之后就会触发的事件
function onConnection(){
    let user=this.user;
    let msg=createMessage('join',user,`${user.name} joined.`);
    this.wss.broadcast(msg);
    let users=this.wss.clients.forEach(function(client){
        return client.user;
    });
    this.send(createMessage('list',user,users));
}

function onMessage(messgae){
    console.log(message);
    if (message && message.trim()){
        let msg=createMessage('chat',this.user,message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose(){
    let user=this.user;
    let msg=createMessage('left',user,`${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss=createWebSocketServer(server,onConnection,onMessage,onClose);
console.log('app started at port 3000...');
