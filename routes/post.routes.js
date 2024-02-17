const express= require("express")
const { createPost, getAllPosts } = require("../controllers/post.controller")
const validateUser = require("../middlewares/auth.middleware")
const router = express.Router()

// route to craete a new post
router.post("/create", validateUser ,createPost)

// route to get all posts
router.get("/", getAllPosts)

module.exports = router