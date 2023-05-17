import express from 'express';

import {
  signup,
  login,
  jwtVerify,
  changePassword,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/jwtVerify', jwtVerify);
router.post('/changePassword/:id', authMiddleware, changePassword);

export default router;
