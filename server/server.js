import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Userrouter from './routes/userRoute.js';
import Profilerouter from './routes/profileRoute.js';

dotenv.config();

const app=express()

const port=process.env.PORT || 3001

app.use(express.json())
// routes

app.use('/api/user',Userrouter);
app.use('/api/profile',Profilerouter);

async function dbConnect(){
    try {
        await mongoose.connect(process.env.CONNECTION_URI).then(()=>{
        console.log("DB connected!");})
    } catch (err) {
        console.log("DB connection failed", err.message)
    }
}

async function startServer() {
    try {
        await dbConnect();
        app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
    } catch (err) {
        console.log('server failed to load/start dur to db errpr')
    }
}

startServer();
