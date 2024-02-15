const express= require("express")
const { createPost, getAllPosts } = require("../controllers/post.controller")
const validateUser = require("../middlewares/auth.middleware")
const router = express.Router()

router.post("/create",validateUser ,createPost)
router.get("/", getAllPosts)

module.exports = router