import express from 'express';
import {
  sendMessage,
  getMessages,
  getMessage,
  deleteMessage,
  updateMessage,
} from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/user/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessage);
router.delete('/:id', protectRoute, deleteMessage);
router.put('/:id', protectRoute, updateMessage);

export default router;
