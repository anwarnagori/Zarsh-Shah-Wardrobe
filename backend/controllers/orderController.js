import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes = '' } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate products and stock
    const orderProducts = [];
    let totalAmount = 0;

    for (const cartItem of cart.products) {
      const product = cartItem.product;
      
      if (product.status !== 'active') {
        return res.status(400).json({ 
          message: `Product ${product.name} is not available` 
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      const price = product.salePrice || product.price;
      const itemTotal = price * cartItem.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: price,
        size: cartItem.size,
        color: cartItem.color
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes
    });

    await order.save();

    // Update product stock
    for (const item of orderProducts) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    cart.products = [];
    await cart.save();

    await order.populate('products.product', 'name price images brand category');
    await order.populate('user', 'name email');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = { user: req.user._id };
    
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('products.product', 'name price images brand category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(filter)
    ]);

    res.json({
      data: orders,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    })
      .populate('products.product', 'name price images brand category')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    await order.populate('products.product', 'name price images brand category');
    await order.populate('user', 'name email');

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, user } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (user) filter.user = user;

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('products.product', 'name price images brand category')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(filter)
    ]);

    res.json({
      data: orders,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
