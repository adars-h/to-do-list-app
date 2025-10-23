const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const router = require("./routes/route.js");
const login =  require("./routes/login.js");
const checkAllowance = require("./middleware/Auth/checkAllowance.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { connectDB } = require("./api/index.js")
// Initializes the express application.
const app = express();
app.set("view engine","ejs");
let isConnected = false; 
async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
app.use((req,res,next)=>{
	if(!isConnected) {
		connectDB():
	}
	next();
});
// configuring middleware functions.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieSession({
	keys: [process.env.SECRET],
	maxAge: 24*60*60*1000
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(login);
app.use("/",checkAllowance,router);


module.exports = app;
