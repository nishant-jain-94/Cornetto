var express = require('express');
var router = express.Router();
var _ = require('underscore');

var UserProfile = require('../User/user-profile.model');
var Board = require('../board/board.model');
var Team = require('.././models/team');


router.get('/:id?',function(req,res,next) {
  var query = {};
  console.log(req.params);
  _.extend(query,req.query,{userId:req.params.id});
  console.log(query);
  UserProfile.findUserProfile(query,function(err,profile) {
    try {
      if(profile)
        res.status(200).json(profile);
      else {
        res.status(404);
      }
    }
    catch(exception) {
      //TODO: have to code proper error handling mechanism. This is temporary :(
      res.status(500).json(exception);
    }
  });
});

router.get('/:id/board/:boardId',function(req,res,next) {

});

router.delete('/:id',function(req,res,next) {
  var query = {};
  _extend(query,req.body,req.params);
  UserProfile.removeUserProfile(query,function(error,profile) {
    try {
      if(profile)
        // Response to a successful request that won't be returning a body
        res.status(204).end();
      else {
        res.status(404);
      }
    }
    catch(exception) {
      res.status(500).end();
    }
  });
});

router.post('/',function(req,res,next) {
  if(req.body) {
    UserProfile.createUserProfile(req.body,function(error,profile) {
      if(error)
        res.status(500).json(error)
      else {
        res.json(profile);
      }
    });
  }
  else {
    req.status(400).end();
  }
});

router.put('/:id',function(req,res,next) {
  if(req.body) {
    _.extend(query,req.body,req.params);
    UserProfile.findOneAndUpdate(query,function(error,profile) {
      res.json(profile);
    });
  }
  else {
    res.status(400).end();
  }
});


module.exports = router;
