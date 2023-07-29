require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require("fs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const util = require('util');
const User = require('../db/schemas');
const googleStrategy = require('passport-google-oauth2').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const CLIENT_URL = "http://localhost:3000/app";

passport.serializeUser(function (user, done) {
    //console.log(user)
    done (null, user.id);
  });
  
  passport.deserializeUser(function (_id, done) {
    console.log('Deserialising');
    User.findById(_id, function (err, user) {
      done (err, user);
    });
  });
  

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id, username: profile.sub, name: profile.displayName }, function (err, user) {
      cb(err, user);
    });
  }
));

  passport.use(new googleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.secret,
    callbackURL: "http://localhost:8080/google/auth/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile.id);
  
      User.findOrCreate({ googleId: profile.id, username: profile.sub, name: profile.displayName }, function (err, user) {
      //  console.log(req.session);
        cb(err, user);
      });
    }
  ));


  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOrCreate({ githubId: profile.id, username: profile.id, name: profile.displayName }, function (err, user) {
          done(err, user);
        });
      }
    )
  );


  router.get('/auth/facebook',
  passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: CLIENT_URL }),
  function(req, res) {
    console.log(req)
  });


  router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] })
);

router.get('/google/auth/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: CLIENT_URL
  }),
  (req, res)=>{
    console.log(req)
  }
  
)


router.get('/auth/github/',
  passport.authenticate('github', { scope: ["profile"] })
)

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: CLIENT_URL
  }),
  (req, res) => res.json('Logged In')
)

router.get('/logout', (req, res) => {
  req.logOut(err=>{
    if(err) res.json('Couldnt Logout');
    else res.json('LO');
  });
  
})


router.get("/help", async(req, res) => {
  console.log('request received AT LOGIN');
  console.log(req.isAuthenticated());
  
  console.log(req.session);
  if (req.isAuthenticated()) {
    const user = await User.findById(req.session.passport.user);
    console.log(req.session.passport.user);
    res.status(200).json({
      success: true,
      message: "successfull",
      user: user,
    });
  }else{
    console.log('not authenticated');
    res.json('Not authenticated');
  }
});


router.get('/like', (req, res)=>{
  if(req.isAuthenticated()){
    res.json('LS');
  }
  else{
    res.json('LN');
  }
})


router.patch('/update', async(req, res)=>{
  console.log(req.body);
  if(req.isAuthenticated()){
    console.log('here');
    const data = await User.findByIdAndUpdate(req.session.passport.user, req.body, {new:true});
    console.log(data);
    res.json(data);
  }
  else{
    res.json(null);
  }
});


router.delete('/delete', async(req, res)=>{
  const data = await User.de
})


module.exports = router;