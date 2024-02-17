const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator');

exports.createAccount = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ message: result["errors"][0].msg })
    }
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(401).json({ color: 'red', message: "User already exists", status: false })
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPass
        })
        const authToken = jwt.sign(user._id.toString(), process.env.JWT_SECRET)
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Created", status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err, status: false })
    }
}

exports.login = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ message: result["errors"][0].msg })
    }
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(401).json({ color: 'red', message: "User doesn't exists", status: false })
        const hash = existingUser.password
        const match = await bcrypt.compare(password, hash)
        if (!match) return res.status(401).json({ message: "Wrong Credentials", status: false })
        const authToken = jwt.sign(existingUser._id.toString(), process.env.JWT_SECRET)
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Logged In", status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ messsage: err, status: false })
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie("user", "", { httpOnly: true, secure: true, sameSite: "Strict", path: "/" })
        res.status(200).json({ message: "Logged Out", status: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err, status: false })
    }
}

exports.getDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.id })
        res.status(200).json({ user, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err, status: false })
    }
}