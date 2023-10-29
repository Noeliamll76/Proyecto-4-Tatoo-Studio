import { Router } from "express";
import { register, login, profile, updateUserByToken, deleteById} from "../controllers/usersController";
import { auth } from "../middlewares/auth";


const router = Router()

router.post('/register', register) 
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/updateUserByToken', auth, updateUserByToken)
router.delete('/deleteById/:id', auth, deleteById)
export {router}