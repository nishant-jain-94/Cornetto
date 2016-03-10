var express = require('express');
var router = express.Router();

//var Board = require('.././models/boardSchema');

//var showAllBoards = function(req,res,next) {
//  Board.find(function(err,data) {
//     res.render('users/home',{ boards: data });
//   });
// }

router.get('/',function(req,res) {
  res.redirect('/users/boards');
});

module.exports = router
