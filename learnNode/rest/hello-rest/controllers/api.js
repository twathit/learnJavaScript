var animals=[{
    specy:'cat',
    quantity:20
},{
    specy:'dog',
    quantity:30
}];

module.exports=[{
    method:'GET',
    path:'/api/animals',
    func:async (ctx,next)=>{
        ctx.response.type='application/json';
        ctx.response.body={
            animals:animals
        };
    }
},{
    method:'POST',
    path:'/api/animals',
    func:async (ctx,next)=>{
        var ani={
            specy:ctx.request.body.specy,
            quantity:ctx.request.body.quantity
        };
        animals.push(ani);
        ctx.response.type='application/json';
        ctx.response.body=ani;
    }
}];