import OTP from '../../models/OTP.js';
import User from '../../models/userModel.js';
import makeToken from '../../utils/token.js';

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone is required' });

    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({ phone, code, expiresAt });

    // TODO: Integrate SMS provider here. For now, return masked response.
    res.status(201).json({ message: 'OTP sent', debug: process.env.NODE_ENV !== 'production' ? code : undefined });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, code, name, email } = req.body;
    if (!phone || !code) return res.status(400).json({ message: 'Phone and code are required' });

    const record = await OTP.findOne({ phone, code, consumed: false, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

    // Mark OTP as consumed
    record.consumed = true;
    await record.save();

    // Upsert user by phone
    let user = await User.findOne({ phone });
    if (!user) {
      // Create minimal user; email optional here, can fill at checkout
      user = await User.create({ name: name || 'User', email: email || `${phone}@placeholder.local`, password: Math.random().toString(36).slice(2), phone, phoneVerified: true });
    } else {
      user.phoneVerified = true;
      await user.save();
    }

    const token = makeToken(user._id);
    res.json({
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      token
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


