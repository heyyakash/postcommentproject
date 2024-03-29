const express = require("express")
const router = express.Router()
const { createAccount, login,logout ,getDetails} = require("../controllers/auth.controller")
const validateUser = require("../middlewares/auth.middleware")
const {body} = require("express-validator")

// Route to create a new user
router.post(
    "/create",
    body('name')
        .notEmpty()
        .escape()
        .withMessage("Please enter a valid name"),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage("Enter a valid email address"),
    body('password')
        .isStrongPassword()
        .withMessage("Please Enter a strong password! It should include atleast 1 special case character, 1 uppercase charater and 1 number and should be atleast 8 characters long"), 
    createAccount)

// Route to login
router.post(
    "/login", 
    body('email')
        .isEmail()
        .withMessage("Please Enter a valid Email Addresss"),
    body('password')
        .notEmpty()
        .withMessage("Enter the password")
    ,
    login)

// Route to logout
router.post("/logout", logout)

// Route to get user details
router.get("/details", validateUser,getDetails)

module.exports = router