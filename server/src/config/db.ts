import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export let isMongoConnected = false;

export const connectDB = async (): Promise<boolean> => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sai-portfolio';
  
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // Quick timeout to fail fast on local test
    });
    isMongoConnected = true;
    console.log('⚡ [Database]: MongoDB successfully connected.');
    return true;
  } catch (error: any) {
    isMongoConnected = false;
    console.warn('⚠️ [Database]: MongoDB connection failed. Falling back to local in-memory storage.');
    console.warn(`Reason: ${error.message}`);
    return false;
  }
};
