var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var authConfig = require('../config/auth-config').Strategy;
// Importing User model which is to be used while saving and retrieving the details of the user.

var UserCredential = require('../User/user-credential.model');
var UserProfile = require('../User/user-profile.model');
var mongoose = require('mongoose');

module.exports = function(passport) {

   passport.serializeUser(function(user, done) {
     console.log("serializeUser");
     console.log(user);
      return done(null, user.userId);
   });

   passport.deserializeUser(function(id, done) {
     console.log("deserializeUser");
     console.log(id,mongoose.Types.ObjectId(id));
      UserProfile.find({'userId':mongoose.Types.ObjectId(id)},function(err, user) {
        console.log("deserializeUser");
        console.log(user);
        return done(null, user);
      });
   });

   //middleware to be used while signup
   passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
   }, function(req, email, password, done) {
     console.log("called");
      process.nextTick(function() {
         UserCredential.findOne({
            'email': email
         }, function(err, user) {
            if (err)
               return done(err);
            if (user) // checks if user is present then return done()
               return done(null, false);
            else {
               var newUser = new UserCredential();
               newUser.email = email;
               // generating a hash for the password using bcrypt, implementation of generateHash is present in User Model
               newUser.local.password = newUser.generateHash(password);
               newUser.save(function(err,userCredentials) {
                  if (err)
                     throw err;
                  var userProfile = new UserProfile();
                  userProfile.userId = userCredentials._id;
                  userProfile.save(function(err) {
                    if(!err)
                    return done(null, userProfile);
                    else {
                      return done(err);
                    }
                  });
               });
            }
         });
      });
   }));

   //middleware
   passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
   }, function(req, email, password, done) {
      process.nextTick(function(req, email, password, done) {
         UserCredential.findOne({
            'email': email
         }, function(err, user) {
            if (err)
               return done(err);

            if (!user) {
               return done(null, false);
            }
            // checking the hash of the password in the database and validating it
            if (!UserCredential.validPassword(password)) {
               done(null, false);
            }

            return done(null, user);
         });
      });
   }));
};
