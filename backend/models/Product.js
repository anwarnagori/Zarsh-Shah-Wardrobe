import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    brand: { type: String, default: 'Zarsh Shah' },
    category: { type: String, required: true }, 
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    sizes: [{ type: String }],   
    colors: [{ type: String }],  
    images: [{ type: String }],  
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text' });

export default mongoose.model('Product', productSchema);
