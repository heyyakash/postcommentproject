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
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'comments'
        }
    ]
})

module.exports = model("posts", post)