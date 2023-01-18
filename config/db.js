const { Sequelize} = require ('sequelize'); // this is class 

const createDB = new Sequelize('test-db', 'user', 'pass',{ // this is object 
    dialect: 'sqlite',
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
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

orderModel.belongsTo(userModel, {foreignKey: "buyerId"});
UserModel.hasMany(orderModel, { foreignKey: "id"});


module.exports = {createDB, connectDB};