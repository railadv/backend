import dotenv from "dotenv"

import express from "express"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

const app = express()

connectDB()

/*
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error")
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log("Listening on:", process.env.PORT)
        })
    }catch(err){
        console.error("ERROR!:", err)
        throw err
    }
})()
    */