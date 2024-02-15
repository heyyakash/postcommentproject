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
    image:{
        type:String,
        default:function(){
            return `https://github.com/identicons/${this.name.replace(/\s/g,'')}.png`
        }
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = model("users", user)