const Comment = require("../models/comments")
const Post = require("../models/post")

exports.createNewComment = async (req,res)=>{
    try{
        const {id:userId} = req
        const {id, comment} = req.body
        const newComment= await Comment.create({
            text:comment,
            author:userId
        })
        await Post.findOneAndUpdate(
            {_id:id},
            {$push:{
                comments: newComment._id
            }}
        )
        res.status(200).json({message:"updated", status:true})
    }catch(err){
        res.status(500).json({err, status:false})
    }
}