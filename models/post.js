const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

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
        commentSchema
    ]
})

module.exports = model("posts", post)