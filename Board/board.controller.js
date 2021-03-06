var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Boards = require('../board/board.model');
var Card = require('../Card/card.model');

// to get board using boardId
router.get('/:boardId',function(req,res,next) {
  Boards.getBoardById(req.params.boardId,function(error,board) {
    if(!error && board) {
      return res.json(board);
    }
    else {
      if(!board) {
        return res.status(500).send(error.message);
      }
    }
  });
});

// to update the name of the board
router.post('/updateTitle',function(req,res,next) {
  try {
    if(!req.body.boardId)
    return res.status(500).send('InvalidArgumentError: boardId cannot be left empty');
    if(!req.body.boardName)
    return res.status(500).send('InvalidArgumentError: boardName cannot be left blank');
    Boards.updateBoardTitle(req.body.boardId,req.body.boardName,function(error,data) {
      if(!error) {
        res.json(data);
      }
      else {
        res.status(500).send(error.message);
      }
    });
  }
  catch(ex) {
    console.error(ex);
    next(ex);
  }
});

// to add a new lane
router.post('/l/add',function(req,res) {
  Boards.addLane(req.body.boardId,req.body.laneName,function(error,board) {
    if(!error) {
      res.json(board);
    }
    else
    res.status(500).send();
  });
});

// to update the name of the lane
router.post('/l/updateTitle',function(req,res) {
  Boards.updateLaneTitle(req.body.laneId,req.body.laneName,function(error,board) {
    if(!error)
    res.json(board);
    else
    next(error);
  });
});


// to create a new board
router.post('/create',function(req,res,next) {
  try {
    if(!req.body) {
      return res.status(500).send("Recieved request with empty body");
    } else if(!req.body.prefs) {
      return res.status(500).send("Recieved a request with empty preferences");
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
      if(!error) {
        return res.json(board);
      }
      else {
        return res.status(500).send(error.message);
      }
    });
  }
  catch(exception) {
    next(error);
  }
});

router.post('/updatePermission',function(req,res,next) {

});

module.exports = router;
