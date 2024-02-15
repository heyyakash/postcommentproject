const Post = require("../models/post")

exports.createPost = async (req, res) => {
    const { id, body } = req
    const { content } = body
    if (!content) {
        return res.status(400).json({ msg: "Content, missing" })
    }
    const payload = {
        content,
        author: id
    }
    try {
        await Post.create(payload)
        res.status(200).json({ message: "Created" })
    } catch (err) {
        return res.status(500).json({ err })
    }
}


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        .populate({
            path:"author",
            select:"-password"
        })
        .populate({
            path:'comments',
            populate:{
                path:"author",
                select:"-password"
            }
        })
        res.status(200).json({ status: true, results: posts.length, posts })
    } catch (err) {
        console.log(err)
        res.status(500).json({status:false  , err})
    }
}