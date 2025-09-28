import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      size: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      }
    }],
    totalItems: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.totalItems = this.products.reduce((total, item) => total + item.quantity, 0);
  this.totalPrice = this.products.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
  next();
});

export default mongoose.model('Cart', cartSchema);
