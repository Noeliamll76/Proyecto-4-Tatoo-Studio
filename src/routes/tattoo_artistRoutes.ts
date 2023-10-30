import { Router } from "express";
import { register} from "../controllers/tattoo_artistController";
  //  , login, profile, updateUserByToken, deleteById

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', auth, isSuperAdmin, register) 
// router.post('/login', login)
// router.get('/profile', auth, profile)
// router.put('/updateUserByToken', auth, updateUserByToken)
// router.delete('/deleteById/:id', auth, isSuperAdmin, deleteById)
export {router}