const express = require("express")
const connectToDatabase = require("./helpers/db")
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const commentRouter = require("./routes/comment.routes")

const app = express()
app.use(express.json())
app.use(cookieParser())

// serving static files
app.get("/",async(req,res)=>{
    res.sendFile(__dirname+'/public/index/index.html')
})
app.get("/login",async(req,res)=>{
    res.sendFile(__dirname+'/public/login/login.html')
})

app.get("/ping", async (req, res) => {
    res.status(200).json({ message: "pong" })
})

// Routes
app.use("/auth",authRouter)
app.use("/post",postRouter)
app.use("/comment",commentRouter)

try {
    (async function () {
        await connectToDatabase()
        app.listen(8000, () => {
            console.log("Server is listening at port : 8080")
        })
    })()
} catch (err) {
    console.log(err)
}

