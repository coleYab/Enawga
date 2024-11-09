import express from 'express';
import {
  getUserByUsername,
  getMessageByKeyword,
} from '../controllers/search.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/messages/:id', protectRoute, getMessageByKeyword);
router.get('/user/:username', protectRoute, getUserByUsername);

export default router;
