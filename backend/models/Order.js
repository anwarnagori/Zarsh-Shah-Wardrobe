import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    orderNumber: { 
      type: String, 
      unique: true, 
      required: true 
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
        min: 1
      },
      price: { 
        type: Number, 
        required: true 
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
    totalAmount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
      default: 'pending' 
    },
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { 
      type: String, 
      required: true,
      enum: ['cash_on_delivery', 'credit_card', 'debit_card', 'bank_transfer']
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    notes: { 
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ZS${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
