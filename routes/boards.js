var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Boards = require('../models/board');
var Card = require('../models/card');


// to add a new lane
router.post('/l/add',function(req,res) {
  Boards.addLane(req.body.boardId,req.body.laneName,function(error,board) {
    if(!error)
      res.json(board);
    else
      next(error);
  });
});

// to update the name of the lane
router.post('/l/updateName',function(req,res) {
  Boards.updateLaneName(req.body.laneId,req.body.laneName,function(error,board) {
    if(!error)
      res.json(board);
    else
      next(error);
  });
});

// to get board using boardId
router.get('/:boardId',function(req,res,next) {
  Boards.getBoardById(req.params.boardId,function(error,board) {
    if(!error && board) {
      res.json(board);
    }
    else {
      if(!board) {
        console.log(error);
        res.json({error: "Something Went wrong."});
        next(err);
      }
    }
  });
});

// to create a new board
router.post('/create',function(req,res) {
  try {
    if(!req.body) {
      throw new Error("Recieved request with empty body");
    } else if(!req.body.prefs) {
      throw new Error("Recieved a request with empty preferences.");
    }
    var board = new Boards({
      "name": req.body.name || "",
      "prefs": {
        "backgroundColor": req.body.prefs.backgroundColor || "",
        "permissionLevel": req.body.prefs.permissionLevel || "",
        "comments": req.body.prefs.comments
      },
      "lanes": [],
      "members": []
    });
    Boards.createBoard(board,function(error,board) {
      if(!error)
        res.json(board);
      else
        next(error);
    });
  }
  catch(exception) {
    next(error);
  }
});

module.exports = router;
