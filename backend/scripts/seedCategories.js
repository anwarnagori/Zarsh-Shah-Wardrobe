import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';

dotenv.config();

const ladiesCategories = [
  {
    name: 'Dresses',
    description: 'Elegant and stylish dresses for every occasion',
    image: '/images/categories/dresses.jpg',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Tops & Blouses',
    description: 'Beautiful tops and blouses for casual and formal wear',
    image: '/images/categories/tops.jpg',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Skirts',
    description: 'Fashionable skirts in various lengths and styles',
    image: '/images/categories/skirts.jpg',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Pants & Trousers',
    description: 'Comfortable and stylish pants for all occasions',
    image: '/images/categories/pants.jpg',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'Jeans',
    description: 'Trendy jeans in various fits and washes',
    image: '/images/categories/jeans.jpg',
    isActive: true,
    sortOrder: 5
  },
  {
    name: 'Jackets & Coats',
    description: 'Stylish outerwear for all seasons',
    image: '/images/categories/jackets.jpg',
    isActive: true,
    sortOrder: 6
  },
  {
    name: 'Kurtas & Tunics',
    description: 'Traditional and contemporary kurtas',
    image: '/images/categories/kurtas.jpg',
    isActive: true,
    sortOrder: 7
  },
  {
    name: 'Sarees',
    description: 'Elegant sarees for special occasions',
    image: '/images/categories/sarees.jpg',
    isActive: true,
    sortOrder: 8
  },
  {
    name: 'Accessories',
    description: 'Beautiful accessories to complete your look',
    image: '/images/categories/accessories.jpg',
    isActive: true,
    sortOrder: 9
  },
  {
    name: 'Shoes',
    description: 'Comfortable and stylish footwear',
    image: '/images/categories/shoes.jpg',
    isActive: true,
    sortOrder: 10
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    await Category.insertMany(ladiesCategories);
    console.log('Seeded ladies clothing categories successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
