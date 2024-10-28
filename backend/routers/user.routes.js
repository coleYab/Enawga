import express from 'express';
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/', deleteUser);
router.put('/', updateUser);

export default router;

