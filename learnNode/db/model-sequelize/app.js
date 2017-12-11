const model=require('./model');

let
    Pet=model.Pet,
    User=model.User;

(async () =>{
        var user=await User.create({
            name:'Edwrd',
            gender:false,
            email:'edward-'+Date.now()+'@top.com',
        });
        console.log('created:'+JSON.stringify(user));
        var dog=await Pet.create({
            ownerId:user.id,
            name:'Odie',
            gender:false,
            birth:'2008-08-08',
        });
        console.log('created:'+JSON.stringify(dog));
    })();
/*
(async ()=>{
    var pets=await Pet.findAll({
        where:{
            name:'Odie'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets){
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender=true;
        p.updatedAt=Date.now();
        p.version++;
        await p.save();
        if (p.version===3){
            await p.destroy();
            console.log(`${p.name} was destroyed.`);
        }
    }
})();
*/
