import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";


const db = mongoose.connection

mongoose.connect(process.env.DATABASE_URI)

db.on('connected', function(){
    console.log(`Connected to MongoDB ${db.name} at ${db.host}: ${db.port}`)
})