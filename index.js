const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json()); //middleware
const userRoutes = require("./routes/user.routes");

const User = require("./models/user.model");


const dburi= "mongodb+srv://vverma971:pbFNIhhDLHtQXGAD@cluster0.qgmus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Database Connection
mongoose.connect(dburi)
.then(()=>{
    console.log("Connected to Database!");
})
.catch((err)=>{
    console.log("Error: ", err);
});



//RESTful API - Representational State Transfer
//Whatever information is required to complete a request
//is contained in the request itself. 

//updating password in profile-> conflict -> profile fetching then updating password
                                                // get request      //put 

//Highly Scalable   -> RESTful API architecture 
//Highly Maintainable -> MVC Structure
//Highly Reliable -> Error Handling
//Highly Secure -> Authentication and Authorization





//user management api

//Home page
app.get("/", (req, res)=>{
    const data = req.body;
    res.send("<h1>Welcome to User Management Server</h1><br><p>This server is meant for managing basic user management features like creating, updating, authenticating the users!</p>");

})


app.use("/", userRoutes);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})