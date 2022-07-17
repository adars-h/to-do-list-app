const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const router = require("./routes/route.js");
const login =  require("./routes/login.js");
const checkAllowance = require("./middleware/Auth/checkAllowance.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
// Initializes the express application.
const app = express();
// connecting to database
mongoose.connect(process.env.CONN,{
	useNewUrlParser:true,
	useUnifiedTopology:true
}).then(() => {
	 console.log("success");
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
app.listen(process.env.PORT || 3000,function(){
});
}).catch((err) => {
	console.log(err);
});


// setting the ejs template engine.
