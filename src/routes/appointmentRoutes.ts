import { Router } from "express";
import { loginAppointmentsById, register, loginArtistAppointments, deleteAppointmentById, updateAppointmentById } from "../controllers/appointmentsController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()


router.post('/register/', auth, register) 
router.post('/loginAppointmentsById/:id', loginAppointmentsById)
// router.post('/loginAppointmentsById/:id', auth, loginAppointmentsById)

router.post('/loginArtistAppointments/:id', auth, loginArtistAppointments)
router.delete('/deleteAppointmentById/:id', auth, deleteAppointmentById)
router.put('/updateAppointmentById/', auth, updateAppointmentById)



export {router}