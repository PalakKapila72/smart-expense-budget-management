const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_expense_db';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Notice: ${error.message} (Running in-memory fallback)`);
    isConnected = false;
  }
};

const getDbStatus = () => isConnected;

module.exports = { connectDB, getDbStatus };
