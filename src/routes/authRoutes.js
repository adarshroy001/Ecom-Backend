import express from 'express' 
import { registerUser } from '../controllers/authController.js'

//Creating router 
const router = express.Router() ; 

router.post('/new',registerUser);

export default router ; 