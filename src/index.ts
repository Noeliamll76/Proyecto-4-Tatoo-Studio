import express from "express"
import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerArtist } from "./routes/tattoo_artistRoutes";
import { router as routerAppointment } from "./routes/appointmentRoutes";
import { router as routerWork } from "./routes/workRoutes";
import cors from "cors";
import { AppDataSource } from "./db"
import "dotenv/config"


const app=express()
app.use(express.json())
app.use(cors())
const PORT=process.env.PORT || 4001

app.use('/user', routerUsers)
app.use('/tattoo_artist', routerArtist)
app.use('/appointment', routerAppointment)
app.use('/work', routerWork)


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





