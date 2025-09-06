import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// 🔸 GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    const newProduct = new Product({ name, description, price, category, imageUrl, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
});

export default router;
