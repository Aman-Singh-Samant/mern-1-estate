import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
        console.log(err);
})


const app= express()

//allow json to be send in server
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000 da')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

//Middleware for throwing error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error da"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})