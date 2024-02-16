const express = require("express")
const router = express.Router()
const { createAccount, login,logout ,getDetails} = require("../controllers/auth.controller")
const validateUser = require("../middlewares/auth.middleware")

router.post("/create", createAccount)
router.post("/login", login)
router.post("/logout", logout)
router.get("/details", validateUser,getDetails)

module.exports = router