import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'zarshahwardrobe@gmail.com';
const ADMIN_PASSWORD = 'Zaf@r123';

async function upsertSingleAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Ensure only one admin exists by demoting any extra admins (safety)
    const admins = await User.find({ role: 'admin' }).sort({ createdAt: 1 });
    if (admins.length > 1) {
      const extras = admins.slice(1);
      for (const extra of extras) {
        extra.role = 'user';
        await extra.save();
      }
      console.log(`Demoted ${extras.length} extra admin(s) to user.`);
    }

    // Upsert the required single admin
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      // If no admin exists, create with provided credentials
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, salt);
      admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashed,
        role: 'admin'
      });
      console.log('Admin created.');
    } else {
      // Ensure email and password match the desired admin
      admin.name = ADMIN_NAME;
      admin.email = ADMIN_EMAIL;
      if (!(await bcrypt.compare(ADMIN_PASSWORD, admin.password))) {
        admin.password = ADMIN_PASSWORD; // will be hashed by pre-save hook
      }
      await admin.save();
      console.log('Admin updated.');
    }

    // Ensure uniqueness constraint is in place
    await User.syncIndexes();

    console.log('Single admin is enforced and ready:', {
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    process.exit(0);
  } catch (err) {
    console.error('Seeding admin failed:', err);
    process.exit(1);
  }
}

upsertSingleAdmin();



