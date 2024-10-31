import express from 'express';
import {
  login,
  signUp,
  logout,
  verifyToken,
  googleLogin,
} from '../controllers/auth.controller.js';
import passport from '../middleware/passportMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/loggedIn',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/signup',
  }),
  googleLogin,
);

router.post('/signup', signUp);
router.post('/logout', logout);
router.get('/verify', verifyToken);

export default router;
