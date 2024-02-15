const express = require("express")
const connectToDatabase = require("./helpers/db")

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.get("/ping", async (req, res) => {
    res.status(200).json({ message: "pong" })
})

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

