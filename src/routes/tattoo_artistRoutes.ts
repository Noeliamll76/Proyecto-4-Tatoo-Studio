import { Router } from "express";
import { register, login} from "../controllers/tattoo_artistController";
  

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";


const router = Router()

router.post('/register', register) 
router.post('/login', login)

export {router}