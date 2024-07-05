import { sendMessage,getMessages } from '../controllers/chatController.js';
import express from 'express';
const router = express.Router();

router.post('/send',sendMessage)
router.post('/get',getMessages)
export default router;