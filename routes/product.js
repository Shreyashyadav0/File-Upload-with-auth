const express = require("express");
const { route } = require("./user");
const{ isAuthenticated, isSeller}= require('../middlewares/auth');      

const router = express.Router();


router.post("/create", isAuthenticated, isSeller, (req,res)=>{
 //middlewares will be called before the function will be called just to check whether the user is authenricated or not
})
module.exports= router; 