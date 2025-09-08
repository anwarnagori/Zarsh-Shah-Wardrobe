import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password, role });
    const token = makeToken(user._id);

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
