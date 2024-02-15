const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.createAccount = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(401).json({ color: 'red', msg: "User already exists", status: false })
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPass
        })
        const payload = {
            id: user._id.toString()
        }
        const authToken = jwt.sign(payload, process.env.JWT_SECRET)
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Created" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(401).json({ color: 'red', message: "User doesn't exists", status: false })
        const hash = existingUser.password
        const match = await bcrypt.compare(req.body.password, hash)
        if (!match) return res.status(401).json({ msg: "Wrong Password", status: false })
        const authToken = jwt.sign(existingUser._id.toString(), process.env.JWT_SECRET)
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Logged In", status:false })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
}
