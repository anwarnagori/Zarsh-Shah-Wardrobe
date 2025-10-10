import Review from '../models/Review.js';
import Product from '../models/Product.js';

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const [reviews, total] = await Promise.all([
      Review.find({ product: productId })
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Review.countDocuments({ product: productId })
    ]);

    res.json({
      data: reviews,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a review
export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = new Review({
      user: req.user._id,
      product: productId,
      rating,
      title,
      comment
    });

    await review.save();
    await review.populate('user', 'name email');

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findOne({
      _id: reviewId,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();
    await review.populate('user', 'name email');

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Fetch review first to recalculate ratings after removal
    const review = await Review.findOne({ _id: reviewId, user: req.user._id });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const productId = review.product;
    await review.deleteOne();
    await Review.calculateAverageRating(productId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's reviews
export const getUserReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find({ user: req.user._id })
        .populate('product', 'name images')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Review.countDocuments({ user: req.user._id })
    ]);

    res.json({
      data: reviews,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
