import express from "express"
import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerArtist } from "./routes/tattoo_artistRoutes";

import { AppDataSource } from "./db"

const app=express()
app.use(express.json())

const PORT=process.env.PORT || 4000

app.use('/user', routerUsers)
app.use('/tattoo_artist', routerArtist)




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





