import { Router } from "express";
import { register } from "../controllers/usersController";
import { login } from "../controllers/usersController";
import { profile } from "console";
import { auth } from "../middlewares/auth";


const router = Router()

router.post('/register', register) 
router.post('/login', login)
router.get('/profile', auth, profile)

export {router}