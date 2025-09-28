import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('products.product', 'name price images brand category')
      .populate('user', 'name email');

    if (!cart) {
      return res.json({
        products: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = '', color = '' } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is active
    if (product.status !== 'active') {
      return res.status(400).json({ message: 'Product is not available' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.products.find(
      item => item.product.toString() === productId && 
      item.size === size && 
      item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
        size,
        color
      });
    }

    await cart.save();
    await cart.populate('products.product', 'name price images brand category');

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.products.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check product stock
    const product = await Product.findById(item.product);
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('products.product', 'name price images brand category');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products.pull(itemId);
    await cart.save();
    await cart.populate('products.product', 'name price images brand category');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
