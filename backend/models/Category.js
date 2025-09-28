import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true,
      unique: true 
    },
    description: { 
      type: String, 
      default: '' 
    },
    image: { 
      type: String, 
      default: '' 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    sortOrder: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
