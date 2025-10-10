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
      // Price snapshot to ensure totals are correct without population
      price: {
        type: Number,
        required: true,
        min: 0
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

// Calculate totals before saving using price snapshot
cartSchema.pre('save', function (next) {
  this.totalItems = this.products.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.products.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);
  next();
});

export default mongoose.model('Cart', cartSchema);
