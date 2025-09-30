import express from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes
router.use(protect);
router.post('/product/:productId', createReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);
router.get('/my-reviews', getUserReviews);

export default router;
