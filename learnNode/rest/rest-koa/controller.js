const fs=require('fs');

function addMapping(router,method,path,func){
    switch(method){
        case 'GET':
            router.get(path,func);
            console.log(`register URL mappping :GET ${path}`);
            break;
        case 'POST':
            router.post(path,func);
            console.log(`register URL mappping :POST ${path}`);
            break;
        case 'PUT':
            router.put(path,func);
            console.log(`register URL mappping :PUT ${path}`);
            break;
        case 'DELETE':
            router.delete(path,func);
            console.log(`register URL mappping :DELETE ${path}`);
            break;
        default:
            console.log('Invalid URL');
            break;
    }
}

function addcontrollers(dir,router){
    var jsFile=fs.readdirSync(__dirname+dir).filter((f)=>{
        return f.endsWith('.js');
    });
    for (var f of jsFile){
        console.log(`process controllers:${f}...`);
        let mappings=require(__dirname+dir+'/'+f);
        mappings.forEach((mapping)=>addMapping(router,mapping.method,mapping.path,mapping.func));
    }
}

module.exports=function(dir){
    let
        controllers_dir=dir||'/controllers',
        router=require('koa-router')();
    addcontrollers(controllers_dir,router);
    return router.routes();
}