import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import dbConnect from "./db/db.js"
import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"
import reviewRoute from "./routes/review.route.js"

// mongoDb connected

dbConnect()

const app=express()
app.use(morgan('dev'))
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Backend is running')
})

app.use("/users",userRoute)
app.use("/books",bookRoute)
app.use("/books",reviewRoute)

export default app