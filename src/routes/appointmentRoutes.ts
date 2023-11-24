import { Router } from "express";
import { loginAppointmentsById, register, loginArtistAppointments, deleteAppointmentById, updateAppointmentById, getAllAppointments } from "../controllers/appointmentsController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()


router.post('/register/', auth, register) 
router.post('/loginAppointmentsById/:id', loginAppointmentsById)
// router.post('/loginAppointmentsById/:id', auth, loginAppointmentsById)

// router.post('/loginArtistAppointments/:id', auth, loginArtistAppointments)
router.get('/loginArtistAppointments/', auth, loginArtistAppointments)
router.delete('/deleteAppointmentById/', auth, deleteAppointmentById)
router.put('/updateAppointmentById/', auth, updateAppointmentById)
router.get('/getAllAppointments', auth, isSuperAdmin, getAllAppointments)


export {router}