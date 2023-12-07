const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // Additional logic or actions can be performed after the connection is established
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with a non-zero code to indicate an error
  }
};

module.exports = connectDB;
