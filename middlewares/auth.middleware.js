const User = require("../models/user")
const jwt = require("jsonwebtoken")


const validateUser = async (req,res,next) => {
    console.log(req.cookies)
    if (req.cookies && req.cookies.user) {
        token = req.cookies.user
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ msg: "Invalid token", status: false });
            }
            req.id = decoded
            next()
        })
    }else{
        return res.status(401).json({message:"Unathorized", success:false})
    }
    
}

module.exports = validateUser