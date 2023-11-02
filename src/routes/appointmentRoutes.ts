import { Router } from "express";
import { loginAppointmentsById, register } from "../controllers/appointmentsController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register/:id', auth, register) 
router.post('/loginAppointmentsById/:id', auth, loginAppointmentsById)

export {router}