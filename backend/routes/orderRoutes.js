import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User routes (require authentication)
router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrder);

// Admin routes (require admin role)
router.get('/', adminOnly, getAllOrders);
router.put('/:id/status', adminOnly, updateOrderStatus);

export default router;
