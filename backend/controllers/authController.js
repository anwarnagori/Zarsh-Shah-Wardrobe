import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import emailTemplate from '../utils/emailTemplate.js';

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password, role });
    const token = makeToken(user._id);

    await sendEmail(
      user.email,
      'Welcome to Zarsh Shah Wardrobe 🎉',
      emailTemplate(
        "Welcome, " + user.name + " 👋",
        "Thank you for signing up! We're thrilled to have you join Zarsh Shah Wardrobe. Explore our collection and enjoy shopping with us.",
        "Start Shopping",
        process.env.CLIENT_URL
      )
    );

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = makeToken(user._id);

    await sendEmail(
      user.email,
      'Login Alert 🔐',
      emailTemplate(
        "Login Successful",
        `Hi ${user.name},<br>You have successfully logged in on <b>${new Date().toLocaleString()}</b>.`,
        "Visit Dashboard",
        process.env.CLIENT_URL + "/dashboard"
      )
    );


    res.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  res.json(req.user);
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 60 minutes
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log("Reset URL:", resetUrl);

    await sendEmail(
      user.email,
      'Password Reset Request 🔑',
      emailTemplate(
        "Reset Your Password",
        `Hi ${user.name},<br>Click the button below to reset your password. This link will expire in 1 hour.`,
        "Reset Password",
        resetUrl
      )
    );


    res.status(200).json({
      message: 'Password reset link sent to your email'
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    await sendEmail(
      user.email,
      'Password Reset Successful ✅',
      emailTemplate(
        "Password Updated",
        `Hi ${user.name},<br>Your password has been updated successfully. If you didn’t request this, please contact our support immediately.`,
        "Login Now",
        process.env.CLIENT_URL + "/login"
      )
    );

    res.status(200).json({ message: 'Password reset successful, you can now login' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
