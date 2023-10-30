import { Router } from "express";
import { register, login, getAllTattooArtist} from "../controllers/tattoo_artistController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', register) 
router.post('/login', login)
router.get('/getAllTattooArtist', auth, isSuperAdmin, getAllTattooArtist)

export {router}