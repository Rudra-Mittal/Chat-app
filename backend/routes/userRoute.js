import { signup,login,logo,getUsers } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/setLogo/:id',logo)
router.get('/getUsers',getUsers)
export default router;