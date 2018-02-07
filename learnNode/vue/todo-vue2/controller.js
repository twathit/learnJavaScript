const fs=require('fs');

function addMapping(router,method,path,func){
    switch(method){
        case 'GET':
            router.get(path,func);
            console.log(`register URL mapping: GET ${path}`);
            break;
        case 'POST':
            router.post(path,func);
            console.log(`register URL mapping: POST ${path}`);
            break;
        case 'PUT':
            router.put(path,func);
            console.log(`register URL mapping: PUT ${path}`);
            break;
        case 'DELETE':
            router.delete(path,func);
            console.log(`register URL mapping: DELETE ${path}`);
            break;
        default:
            console.log(`invalid URL`);
            break;
    }
}

function addControllers(router,dir){
    var js_files = fs.readdirSync(__dirname + dir).filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_files){
        console.log(`Process controller: ${f}...`);
        let mappings = require(__dirname + dir + '/' + f);
        for (var mapping of mappings){
            addMapping(router,mapping.method,mapping.path,mapping.func);
        }
    }
}

module.exports=function (dir) {
    let
        controllers_dir = dir || '/controllers';
        router = require('koa-router')();
    addControllers(router,controllers_dir);
    return router.routes();
};