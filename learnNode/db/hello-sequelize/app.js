const Sequelize=require('sequelize');
const config=require('./config');

const sequelize=new Sequelize(config.databases,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});

/*
sequelize.authenticate()
.then(() =>{
    console.log('success');
}).catch((err) =>{
    console.error('Error:',err);
});
*/

var Pet=sequelize.define('pet',{
    id:{
        type:Sequelize.STRING(50),
        primaryKey:true
    },
    name:Sequelize.STRING(100),
    gender:Sequelize.BOOLEAN,
    birth:Sequelize.STRING(10),
    createdAt:Sequelize.BIGINT,
    updatedAt:Sequelize.BIGINT,
    version:Sequelize.BIGINT
},{
    timestamps:false
});

var now=Date.now();         //Date函数

(async () =>{
    var dog=await Pet.create({
        id:'d-'+now,
        name:'Odie',
        gender:false,
        birth:'2008-08-08',
        createdAt:now,
        updatedAt:now,
        version:0
    });
    console.log('created:'+JSON.stringify(dog));
})();

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

