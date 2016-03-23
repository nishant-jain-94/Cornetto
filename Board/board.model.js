var mongoose = require('mongoose');
var Card = require('../Card/card.model');
var UserProfile = require('../User/user-profile.model');

var BoardSchema = new mongoose.Schema({
  "name": { type: String, required: true },
  "url": String,
  "desc": String,
  "team": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": 'Team'
  },
  "prefs": {
    "backgroundColor": { type: String, required: true },
    "permissionLevel": { type: String, required: true, enum: ['public','private'] },
    "backgroundImage": { type: String },
    "comments": {type: String, required: true, enum: ['public','members'] }
  },
  "lanes": [
    {
      "name": { type: String, required: true },
      "cards": [{"card":{ "type": mongoose.Schema.Types.ObjectId,"ref": 'Card'}}]
    }
  ],
  "members": [
    {
      "memberId":
      {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": 'User'
      }
    }
  ]
},{timestamps: true});

/* Adding lane to a Board
* boardId - refers to the board on which a lane or list has to be createBoard
* laneName - refers to the title or the name of lane
* cb - refers to the callback to be called once the lane is created
*/
BoardSchema.statics.addLane = function(boardId,laneName,cb) {
  try {
    this.findByIdAndUpdate(mongoose.Types.ObjectId(boardId), {$push: {lanes: {name:laneName}}},{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Updating the name of the laneId
* laneId - refers to the id of the lane whose name has to be changed.
* laneName - refers to the updated name of the lane.
* cb - refers to the callback which is to be called once the lane name is updated.
*/
BoardSchema.statics.updateLaneTitle = function(laneId,laneName,cb) {
  try {
    this.update({'lanes._id':mongoose.Types.ObjectId(laneId)},{'$set': {'lanes.$.name' : laneName}},cb);
  }
  catch(exception) {
    cb(exception);
  }
};

/* Creating a new Board
* board - refers to the board object which has to be inserted into the collection.
* cb - refers to the callback to be called when the creation of board is completed.
*/
BoardSchema.statics.createBoard = function(board,cb){
  try {
    this.create(board,cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Update Boards name
* boardId - refers to the id of the board.
* boardName - boardName refers to the new name which has to be given to the board.
* cb - refers to the callback to be called once the update operation is completed.
*/
BoardSchema.statics.updateBoardTitle = function(boardId,boardName,cb) {
  try {
    this.findByIdAndUpdate(mongoose.Types.ObjectId(boardId),{'name':boardName},{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Update Boards Background color
* boardId - refers to the id of the board whose backgroundColor has to be changed.
* backgroundColor - refers to the color by which the existing backgroundColor has to be updated.
* cb - refers to the callback to be called when the update operation is completed.
*/
BoardSchema.statics.updateBoardBackgroundColor = function(boardId,backgroundColor,cb) {
  try {
    this.findByIdAndUpdate(boardId,{'prefs.backgroundColor':backgroundColor},{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Add a member to the board
* boardId - refers to the id of the board where the member has to be added.
* member - refers to the user which has to be added into members array.
* cb - refers to the callback to be called when a member has been successfully added.
*/
BoardSchema.statics.addMember = function(boardId,member,cb) {
  try {
    this.findByIdAndUpdate(boardId,{$push: {'members': member}},{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Remove a member from the record
* boardId - refers to the Id of the board from where the member has to removed.
* memberId - refers to the Id of the member which has to be removed.
* cb - refers to the callback to be called when the operation is completed.
*/
BoardSchema.statics.removeMember = function(boardId,memberId,cb) {
  try {
    this.findByIdAndUpdate(boardId,{$pull:{'members.member._id':memberId}},{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

/* Adding a card to the lane
* laneId - refers to the lane where card has to be added.
* cardId - refers to the card which has to be added to the lane.
* cb - refers to the callback when a card has been added to the lane.
*/
BoardSchema.statics.addCardToLane = function(laneId,cardId,cb) {
  try {
    this.update("lanes._Id",{$push: {'lanes.$.cards': cardId}},cb);
  }
  catch(exception) {
    cb(exception,null)
  }
};

/* Getting the Board By Id
* boardId - refers to the id of the board.
* cb - refers to the callback to be called once the board has been fetched.
*/
BoardSchema.statics.getBoardById = function(boardId,cb) {
  try {
    var boardID = mongoose.Types.ObjectId(boardId);
    this.findById(boardID,cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

module.exports = mongoose.model("Board", BoardSchema,"boards");
