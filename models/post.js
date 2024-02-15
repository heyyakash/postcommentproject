const { Schema, model } = require("mongoose")

const post = new Schema({
    content:{
        type:String,
        required:true,
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' ,
        required:'true'
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'comments'
        }
    ]
})

module.exports = model("posts", post)