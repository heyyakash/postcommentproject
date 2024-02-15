const { Schema, model } = require("mongoose")

const post = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' ,
        required:'true'
    }
})

module.exports = model("posts", post)