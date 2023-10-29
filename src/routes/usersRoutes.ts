import { Router } from "express";
import { register } from "../controllers/usersController";
import { login } from "../controllers/usersController";

const router = Router()

router.post('/register', register) 
router.post('/login', login)

export {router}