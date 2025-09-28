import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user addresses
export const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('addresses');
    res.json(user.addresses || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add user address
export const addUserAddress = async (req, res) => {
  try {
    const { name, phone, address, city, state, postalCode, country, isDefault } = req.body;

    const newAddress = {
      name,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false
    };

    const user = await User.findById(req.user._id);

    // If this is set as default, make all other addresses non-default
    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user address
export const updateUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { name, phone, address, city, state, postalCode, country, isDefault } = req.body;

    const user = await User.findById(req.user._id);
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // If this is set as default, make all other addresses non-default
    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      name,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false
    };

    await user.save();
    res.json(user.addresses[addressIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user address
export const deleteUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user._id);
    user.addresses.pull(addressId);
    await user.save();

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
