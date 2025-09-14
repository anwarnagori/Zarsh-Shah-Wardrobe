import Product from '../../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      q,
      category,
      minPrice,
      maxPrice,
      sort = '-createdAt'
    } = req.query;

    const filter = { status: 'active' };
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      data: items,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: 'Invalid id' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
