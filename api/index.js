const mongoose = require("mongoose");
const app = require("../app"); // notice the ../ (one folder up)

let isConnected;

async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 100000,
      socketTimeoutMS: 45000,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
