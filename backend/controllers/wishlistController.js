import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [wishlist, total] = await Promise.all([
      Wishlist.find({ user: req.user._id })
        .populate('product', 'name price images brand category description')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Wishlist.countDocuments({ user: req.user._id })
    ]);

    res.json({
      data: wishlist,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already in wishlist
    const existingWishlist = await Wishlist.findOne({
      user: req.user._id,
      product: productId
    });

    if (existingWishlist) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlist = new Wishlist({
      user: req.user._id,
      product: productId
    });

    await wishlist.save();
    await wishlist.populate('product', 'name price images brand category description');

    res.status(201).json(wishlist);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user._id,
      product: productId
    });

    if (!wishlist) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if product is in wishlist
export const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user._id,
      product: productId
    });

    res.json({ inWishlist: !!wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
