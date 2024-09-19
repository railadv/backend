import dotenv from "dotenv"
import { app } from "./app.js";
import express from "express"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })

    app.on("error", (err)=>{
        console.log("There was an error while connecting to the DB", err)
        
    })
})
.catch((err)=>{
    console.log("Mongo connection failed", err)
})

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