import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', changePassword);

router.get('/addresses', getUserAddresses);
router.post('/addresses', addUserAddress);
router.put('/addresses/:addressId', updateUserAddress);
router.delete('/addresses/:addressId', deleteUserAddress);

export default router;
