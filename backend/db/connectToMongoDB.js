import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    console.log('Initiating connection to MongoDB ...');
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('C:Error connecting to MongoDB', error.message);
  }
};

export default connectToMongoDB;
