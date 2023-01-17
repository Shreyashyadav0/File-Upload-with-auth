const { Sequelize} = require ('sequelize'); // this is class 

const createDB = new Sequelize('test-db', 'user', 'pass',{ // this is object 
    dialect: 'splite',
    host: './config/db.splite',
     
});
//this function
const connectDB= () =>{
    createDB.sync().then(()=>{
        console.log('connected to db');
    })
    .catch((e)=>{
        console.log('db connection is failed',e);
    })
}
module.exports = {createDB, connectDB};