import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(() => {
  console.log("MongoDB connected successfully.");
  app.listen(PORT, () => console.log(`🚀 Server is running on port: ${PORT}`));
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

app.use('/api/products', productRoutes);
