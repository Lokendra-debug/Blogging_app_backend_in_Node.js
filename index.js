const express=require("express")
const cors=require("cors")
require("dotenv").config()

const {connection}=require("./config/db")
const {userRoute}=require("./routes/user.route")
const {blogRoute}=require("./routes/blog.route")


const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoute)
app.use("/blogs",blogRoute)

app.all("*",(req,res)=>{
    return res.status(404).send("404 Route Not Found")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB connected")
    } catch (error) {
        console.log(error.message)
    }

    console.log(`server is running on port ${process.env.port}`)
})