import { Router } from "express";
import { registerWork, loginWorkArtist, getAllWorks, createAppointmentByWork} from "../controllers/workController";
  

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";


const router = Router()

router.post('/registerWork', auth, isAdmin, registerWork) 
router.post('/loginWorkArtist/:id', auth, isAdmin, loginWorkArtist) 
router.get('/getAllWorks', getAllWorks) 
router.post('/createAppointmentByWork', auth, createAppointmentByWork) 



export {router}