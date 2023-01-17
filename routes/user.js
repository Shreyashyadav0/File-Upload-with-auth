const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");

const {
    validateName,
    validateEmail,
    validatePassword
} = require('../utils/validators');
 
router.post("/signup", async(req,res) =>{
    try{

        const{ name, email, password, isseller} = req.body;
        const existingUser = await User.findOne({where:{ email}});
        if (existingUser){
            return res.status(400).json({ err:"User already Exists"});
        }

        if(!validateName(name)){
            return res.status(400).json({ err:"Name validate fails"});
        }
        if (!validateEmail(email)){
            return res.status(400).json({ err:"Email validate fails"});
        }
        if (!validatePassword(password)){
            return res.status(400).json({ err:"Password  validate fails"});
        }

       const hashedPassword = await bcrypt.hash(password,(saltOrRounds =10));    

       const  user={
        email,
        name,
        isseller,
        password: hashedPassword
       };

       const createdUser = await User.create(user);

       return res.status(201).json({
        message:`Welcome ${createdUser.name}`,
       })
    }catch(e){
        return res.status(500).send(e);
    }
}
);
router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body; //* destructuring email and password out of the request body
  
      if (email.length === 0) {
        return res.status(400).json({ err: "Please enter your email" });
      }
      if (password.length === 0) {
        return res.status(400).json({ err: "Please enter your password" });
      }
  
      const existingUser = await User.findOne({ where: { email: email } }); //* check if the user with the entered email exists in the database
      if (!existingUser) {
        return res.status(404).json("Error: User not found");
      }
  
      //* hashes the entered password and then compares it to the hashed password stored in the database
      const passwordMatched = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!passwordMatched) {
        return res.status(400).send("Error: Incorrect password");
      }
  
      const payload = { user: { id: existingUser.dataValues.id } };
      const bearerToken = await jwt.sign(payload, "Message", {
        expiresIn: 360000,
      });
  
      res.cookie("t", bearerToken, { expire: new Date() + 9999 });
  
      console.log("Logged in successfully");
  
      return res
        .status(200)
        .json({ message: "Signed In Successfully!", bearerToken: bearerToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });
  
  router.get("/signout", async (_req, res) => {
    try {
      res.clearCookie("t");
      return res.status(200).json({ message: "Signed out successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    }
  });
  


module.exports = router;
