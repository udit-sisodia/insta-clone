const express=require("express")
const app=express()
const cors=require("cors")
const authRouter=require("./routes/auth.routes")
const cookieParser=require("cookie-parser")
const postRouter=require("./routes/post.routes")
const userRouter=require("./routes/user.routes")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)


module.exports=app