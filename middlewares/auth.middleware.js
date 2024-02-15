const User = require("../models/user")
const jwt = require("jsonwebtoken")


const validateUser = async (req,res,next) => {
    if (req.cookies && req.cookies.user) {
        token = req.cookies.user
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ msg: "Invalid token", status: false });
            }
            req.id = decoded
            const user = await User.findOne({_id:decoded})
            if(!user){
                return res.status(401).json({message:"Unathorized", success:false})
            }
            req.loggedIn = true
            next()
        })
    }else{
        return res.status(401).json({message:"Unathorized", success:false})
    }
    
}

module.exports = validateUser