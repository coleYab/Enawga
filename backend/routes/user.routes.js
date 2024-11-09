import express from 'express';
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getUsers);
router.get('/:id', protectRoute, getUserById);
router.delete('/', protectRoute, deleteUser);
router.put('/', protectRoute, updateUser);

export default router;
