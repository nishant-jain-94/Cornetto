var express = require('express');
var router = express.Router();

var UserProfile = require('../User/user-profile.model');
var Board = require('../board/board.model');
var Team = require('.././models/team');

router.post('/addCard',function(req,res) {
  try {
    UserProfile.addCard(req.body.userId,req.body.card,function(err,card) {
      res.json(card);
    });
  }
  catch(exception) {
    res.status(500).json(exception);
  }
});

router.post('/addBoard',function(req,res) {
  try {
    UserProfile.addBoard(req.body.userId,req.body.board,function(err,doc) {
      res.json(doc);
    });
  }
  catch(exception) {
    res.status(500).json(exception);
  }
});

router.post('/changeUserDetails',function(req,res,next) {

});

router.post('/addTeam',function(req,res,next) {
  UserProfile.addTeam(req.body.userId,req.body.team,function(err,doc) {
    res.json(doc);
  });
});

module.exports = router;
