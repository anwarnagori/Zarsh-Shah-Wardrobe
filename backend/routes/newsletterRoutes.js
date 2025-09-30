import express from 'express';
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getSubscribers
} from '../controllers/newsletterController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribeNewsletter);
router.post('/unsubscribe', unsubscribeNewsletter);

// Admin routes
router.get('/subscribers', protect, adminOnly, getSubscribers);

export default router;
