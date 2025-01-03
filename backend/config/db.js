const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to mongo...");
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error){
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
