const express = require("express")
const router = express.Router()
const { createAccount, login } = require("../controllers/auth.controller")

router.post("/create", createAccount)
router.post("/login", login)

module.exports = router