import { Router } from "express";
import { register, login, getAllTattooArtist, deleteArtistById} from "../controllers/tattoo_artistController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', auth, isSuperAdmin, register) 
router.post('/login', login)
router.get('/getAllTattooArtist', getAllTattooArtist)
// router.get('/getAllTattooArtist', auth, isSuperAdmin, getAllTattooArtist)
router.delete('/deleteArtistById/:id', auth, isSuperAdmin, deleteArtistById)


export {router}