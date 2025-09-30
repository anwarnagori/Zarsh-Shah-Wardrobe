import Newsletter from '../models/Newsletter.js';

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({ message: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();
        return res.json({ message: 'Successfully resubscribed to newsletter' });
      }
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ message: 'Email not found in our newsletter list' });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscribers (admin only)
export const getSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 50, isActive } = req.query;
    const filter = {};
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter)
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Newsletter.countDocuments(filter)
    ]);

    res.json({
      data: subscribers,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
