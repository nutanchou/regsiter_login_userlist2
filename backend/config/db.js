require('dotenv').config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/userTask", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    const mongoURI = process.env.MONGO_URI;
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
