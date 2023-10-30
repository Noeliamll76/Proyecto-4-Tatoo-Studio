import { Router } from "express";
import { register, login, getAllTattooArtist} from "../controllers/tattoo_artistController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', auth, isSuperAdmin, register) 
// router.post('/login', login)
// router.get('/profile', auth, profile)
// router.put('/updateUserByToken', auth, updateUserByToken)
// router.delete('/deleteById/:id', auth, isSuperAdmin, deleteById)
router.post('/register', register) 
router.post('/login', login)
router.get('/getAllTattooArtist', auth, isSuperAdmin, getAllTattooArtist)

export {router}