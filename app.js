const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const router = require("./routes/route.js");
const login =  require("./routes/login.js");
const checkAllowance = require("./middleware/Auth/checkAllowance.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
// Initializes the express application.
const app = express();
app.set("view engine","ejs");
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
