const mongoose = require("mongoose");

//why do we need a schema?
// 1. allow only validated data on our server
//2. enforce structure 
//3. error handling 
//4. security



//users-> username, age, email, role, password

//email, password -> wrong email vishooverma@gmail.com-> vishooverma 

//now whenever anyone would be signing up, they will have to enter the data
//that is compliant with this schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required to submit this form" ],
        unique:[true, "Username should be unique"],
        trim:true, //removes extra spaces
        lowercase:true, 
        minlength:[3, "Username should be atleast 3 characters long"],
        maxlength:[20, "Username should be atmost 20 characters long"]
    },
    age:{
        type: Number,
        required:false,
        min:[5, "Pehle Bade ho jao"],
        max:[100, "Budhe ho gye ho"]
    },
    email:{
        type:String,
        required:[true, "Email is required to submit this form"],
        unique:[true, "Email should be unique"],
        trim:true,
        lowercase:true,
        minlength:[5, "Email should be atleast 5 characters long"],
        maxlength:[50, "Email should be atmost 50 characters long"],
        // validate:{
        //     validator: function(value){
        //         return value.includes("@");
        //         //true, false
        //     },
        //     message:"Email is not valid"
        // },
        match: [/^\S+@\S+\.\S+$/, "Email is not valid"]
    },
    role:{
        type:String,
        required:false,
        default:"user",
        //there are only few values that are allowed -> user, admin, superadmin
        enum:["user", "admin", "superadmin"]
    },
    password:{
        type:String,
        required:[true, "Password is required to submit this form"],
        trim:true,
        minlength:[8, "Password should be atleast 8 characters long"],
        maxlength:[20, "Password should be atmost 20 characters long"]
    
    }
});



const User = mongoose.model("User", userSchema);



module.exports = User;