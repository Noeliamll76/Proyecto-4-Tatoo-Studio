import { Router } from "express";
import { register, login, profile, updateUserByToken, deleteById, getAllUsers, updateRol} from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', register) 
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/updateUserByToken', auth, updateUserByToken)
router.delete('/deleteById/:id', auth, isSuperAdmin, deleteById)
router.get('/getAllUsers', auth, isSuperAdmin, getAllUsers)
router.put('/updateRol', auth, isSuperAdmin, updateRol)

export {router}