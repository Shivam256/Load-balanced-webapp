import express from 'express';
import adminMiddleware from '../middlewares/isAdmin.js';
import {
  getAllEmployees,
  changeEmployeeStatus,
  editUserProfile,
  getOneEmployee,
  deleteEmployee
} from '../controllers/user.controller.js';

import multer from 'multer';
import { storage } from '../cloudinary/cloudinary.config.js';
import authMiddleware from '../middlewares/isAuth.js';

const router = express.Router();

const upload = multer({ storage });

router.get('/employees', authMiddleware, adminMiddleware, getAllEmployees);
router.post(
  '/changeStatus/:id',
  authMiddleware,
  adminMiddleware,
  changeEmployeeStatus
);
router.post(
  '/editProfile/:id',
  authMiddleware,
  upload.single('image'),
  editUserProfile
);
router.get('/employee/:id', authMiddleware, getOneEmployee);

router.post('/deleteEmployee',deleteEmployee)

export default router;
