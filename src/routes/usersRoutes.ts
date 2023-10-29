import { Router } from "express";
import { register } from "../controllers/usersController";

const router = Router()

router.post('/register', register) 


export {router}