const products=require('../products');
const APIError=require('../rest').APIError

module.exports=[{
    method:'GET',
    path:'/api/products',
    func:async (ctx,next)=>{
        ctx.rest({
            products:products.getProducts()
        });
    }
},{
    method:'POST',
    path:'/api/products',
    func:async (ctx,next)=>{
        var p=products.createProduct(ctx.request.body.name,ctx.request.body.manufacturer,parseFloat(ctx.request.body.price));
        ctx.rest(p);
    }
},{
    method:'DELETE',
    path:'/api/products/:id',
    func:async (ctx,next)=>{
        console.log(`delete product ${ctx.params.id}...`);
        var p=products.deleteProduct(ctx.params.id);
        if (p){
            ctx.rest(p);
        }else{
            throw new APIError('product:not_found','product not found by id.');
        }
    }
}];