import express from "express"
import { AppDataSource } from "./db"

const app=express()
const PORT=process.env.PORT || 4000

AppDataSource.initialize()
.then (()=>{
    app.listen(PORT, () => {
        console.log(`Server runing ${PORT}`)
    })
    console.log ('Database connected')
})
.catch (error=>{
    console.log(error)
})





