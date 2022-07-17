const express = require('express');
const passport = require('passport');
const User = require('../models/user.js');
const login = express.Router();
require("dotenv").config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://thawing-stream-82138.herokuapp.com/login/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ emailId: profile._json.email })
  .then((user)=>{
        if(!user) {
          User.create({
            emailId:  profile._json.email,
            googleId: profile.id
          }).then((user) => {
             cb(null,user);
          }).catch((err)=>{
            cb(err,false);
          })
        } else {
          cb(null,user);
        }
  }).catch((err)=>{
        cb(err,false);
  }) 
}
));

login.get('/login',(req,res) => {
    return res.render("auth");
});

login.get('/login/google',passport.authenticate('google',{scope:['profile','email']}));
login.get('/login/google/callback',passport.authenticate('google',{successRedirect:'/tasks',failureRedirect:'/login'}));
login.get('/logout',(req,res)=>{
      req.session = null;
      res.redirect('/login');
});
module.exports = login;