var express = require('express');
var router = express.Router();

// var User = require('.././models/userSchema');
// var Board = require('.././models/boardSchema');
// var Team = require('.././models/teamSchema');
var Card = require('.././models/card');

var createCard = function(req,res,next) {
  var title = req.body.title;
  var boardId = req.body.boardId;
  var listId = req.body.listId;
  card.create({
    "title": title,
    "boardId": boardId,
    "listId": listId,
    "members": [],
    "checkLists": [],
    "attachments": { },
    "comments": []
  },function(err,doc) {
    res.json(doc);
  });
}

var getCards = function(req,res,next) {
  var boardId = req.param.boardId;
  Card.find({ boardId: boardId },function(err,docs) {
    req.cards = docs;
    next();
  })
}

router.post('/create',createCard);

module.exports = router;
