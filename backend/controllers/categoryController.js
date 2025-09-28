import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = {};

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const categories = await Category.find(filter)
      .sort({ sortOrder: 1, name: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single category
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create category (admin only)
export const createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, sortOrder } = req.body;

    const category = new Category({
      name,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update category (admin only)
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, sortOrder } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image, isActive, sortOrder },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete category (admin only)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
