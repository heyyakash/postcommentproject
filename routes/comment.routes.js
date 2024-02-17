const express = require("express")
const validateUser = require("../middlewares/auth.middleware")
const { createNewComment } = require("../controllers/comment.controller")
const router = express.Router()

// function to create a comment
router.post("/create", validateUser, createNewComment)

module.exports = router