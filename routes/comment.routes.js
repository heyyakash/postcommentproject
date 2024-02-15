const express = require("express")
const validateUser = require("../middlewares/auth.middleware")
const { createNewComment } = require("../controllers/comment.controller")
const router = express.Router()

router.post("/create", validateUser, createNewComment)

module.exports = router