import express from 'express';
import {
  getUserByUsername,
  getMessageByKeyword,
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/messages/:id', getMessageByKeyword);
router.get('/user/:username', getUserByUsername);

export default router;

