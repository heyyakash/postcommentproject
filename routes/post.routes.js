const express= require("express")
const { createPost } = require("../controllers/post.controller")
const validateUser = require("../middlewares/auth.middleware")
const router = express.Router()

router.post("/create",validateUser ,createPost)

module.exports = router