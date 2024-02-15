const {Schema,  model} = require("mongoose")

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = model("users", user)