
const express= require("express");
const router = express.Router();
const User = require("../models/user.model");

//Create Account + Authentication
router.post("/createAccount", async (req, res)=>{
   
    try{
     const user = await User.create(req.body);
     console.log(user);
     res.status(201).send("User Created Successfully!");
    }
    catch(err){
         res.status(400).send(err.message);
    }
 });
 
 //signup page
 //Name, Email, Password, Confirm Password, Phone Number, Address
 
 
 //Login + Authentication
 router.post("/login", async (req, res)=>{
     
 
     try{
 
         //extract the information that would be used to authenticate the user
     const { username, password } = req.body;
 
     //mongoose has CRUD operations defined as methods of the User object 
     //findOne -> finds the first document that matches the query
     const user = await User.findOne({username});
     console.log(user);
     //if the user is not found we will send a 404 status code
     if(!user){
         return res.status(404).send("User not found!");
     }
 
     //if the password is incorrect we will send a 400 status code
     if(user.password !== password){
         return res.status(400).send("Invalid Password!");
     }
 
 
 
     //if the user is found and the password is correct we will send a 200 status code
     res.status(200).send("User Logged in Successfully!");
 
     }catch(err){
         res.status(400).send(err.message);
     }
 })
 
 
 //Profile
 router.get("/profile", async (req, res)=>{
     try{
         const user = await User.find({username: req.body.username});
         if(!user){
             return res.status(404).send("User not found!");
         }
         res.status(200).send(user);
     }
     catch(err){
         res.status(400).send(err.message);
     }
 });
 
 
 //Authentication is the process of verifying the identity of a user.
 
 //Logout
 router.get("/logout", (req, res)=>{
     //destroy the session
     res.send("User Logged out Successfully!");
 });
 
 
 
 //Change Password
 router.put("/changePassword", async (req, res)=>{
     try{
         const { username, password, newPassword}= req.body;
         const user = await User.findOne({username});
         if(!user){
             return res.status(404).send("User not found!");
         }
         if(user.password !== password){
             return res.status(400).send("Invalid Password!");
         }
         user.password= newPassword;
         await user.save(); //save the updated user object
         res.status(200).send("Password Changed Successfully!");
     }
     catch(err){
         res.status(400).send(err.message);
     }
 })
 
 
 
 //Delete Account
 router.delete("/deleteAccount", async (req, res)=>{
     try{
         const {username, password}= req.body;
         const user = await User.findOne({username});
         if(!user){
             return res.status(404).send("User not found!");
         }
         if(user.password !== password){
             return res.status(400).send("Invalid Password!");
         }
         await user.deleteOne({username:username}); //remove the user object from the database
         res.status(200).send("User Deleted Successfully!");
     }
     catch(err){
         res.status(400).send(err.message);
     }
 });
 

module.exports = router;