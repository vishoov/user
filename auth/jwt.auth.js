const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        console.log(decoded);

        if (!decoded) {
            throw new Error("Invalid Token");
        }

        next();
    } catch (err) {
        res.status(401).send("Please authenticate!");
    }
};

const JWT_SECRET_KEY= "thisisaverysecurekey";

const generateToken = (id)=>{
    
        jwt.sign({id}, JWT_SECRET_KEY,{
                expiresIn:"1d",
                algorithm:"HS256"
            }
        )

        
};


module.exports = {auth, generateToken};



