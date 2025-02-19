
const express= require("express");
const router = express.Router();
const User = require("../models/user.model");
const generateToken = require("../auth/jwt.auth");
const { JsonWebTokenError } = require("jsonwebtoken");
//Create Account + Authentication
const jwt = require("jsonwebtoken");
const auth = require("../auth/jwt.auth");



router.post("/createAccount", async (req, res) => {
    try {
        const user = await User.create(req.body);

        const token = auth.generateToken(user.username);

     
        res.status(201).json({ user, token, message: "User Created Successfully!" });
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



 
 //signup page
 //Name, Email, Password, Confirm Password, Phone Number, Address
 
router.get("/users", async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users);
    }
    catch(err){
        res.status(400).send(err.message);
    }
});


 //Login + Authentication
 router.post("/login",  async (req, res)=>{
     
 
     try{
 
         //extract the information that would be used to authenticate the user
     const { username, password } = req.body;
   
     //mongoose has CRUD operations defined as methods of the User object 
     //findOne -> finds the first document that matches the query
     const user = await User.findOne({username});
     console.log(user);

     const token = auth.generateToken(user.username);
    //  if(!token){
    //      return res.status(400).send("Token not generated");
    //  }
     //if the user is not found we will send a 404 status code
     if(!user){
         return res.status(404).send("User not found!");
     }
 
     //if the password is incorrect we will send a 400 status code
    //  if(user.password !== password){
    //      return res.status(400).send("Invalid Password!");
    //  }
 
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
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
 

 router.get("/avgAge", async (req, res)=>{
    try{
        const avgAge = await User.aggregate([
            {
                $group:{
                    _id: null,
                    averageAge: { $avg: "$age"}
                }
            },
            {
                $project:{
                    _id:0,
                    averageAge:1
                }
            }
        ])
        res.status(200).send(avgAge);
    }
    catch(err){
        res.status(400).send(err.message);
    }
 })

 //users-> count
 //admins -> count
 //superadmins -> count


 //this aggregation applies on our 
 router.get("/countUsers", async (req, res)=>{
    try{
        const countUsers = await User.aggregate([
            {
                $group:{
                    _id:"$role",
                    count:{
                        $sum:1
                    }
                }
            },
            {
                $sort:{
                    count:-1
                }
            },
            {
                $limit:3
            },
            {
                $project:{
                    _id:0,
                    role:"$_id",
                    count:1
            }
        }

        ])
        res.status(200).send(countUsers);
    }
    catch(err){
        res.status(400).send(err.message);
    }
    
 })



    //there is no specific key 
    //average age 

//sort ->1 , -1 
//group -> for getting average 
//match -> exact filterint match 
//limit -> 5 
//project



module.exports = router;