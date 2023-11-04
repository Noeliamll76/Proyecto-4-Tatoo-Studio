import { Router } from "express";
import { registerWork} from "../controllers/workController";
  

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";


const router = Router()

router.post('/registerWork', auth, isAdmin, registerWork) 



export {router}