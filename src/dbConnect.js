const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/askexpert');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB');
    console.log('Error Message:', error.message);
  }
}
module.exports = dbConnect;
