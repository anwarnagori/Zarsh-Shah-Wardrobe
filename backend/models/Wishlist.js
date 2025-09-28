import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    }
  },
  { timestamps: true }
);

// Ensure user can't add same product to wishlist multiple times
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
