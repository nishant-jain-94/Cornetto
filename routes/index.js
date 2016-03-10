var UserProfile = require('../models/user-profile');

module.exports = function(app,passport) {

  app.get('/dashboard',function(req,res) {
    console.log(req.session);
    console.log(req.user);
    res.json(req.user);
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }));

  app.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));

};
