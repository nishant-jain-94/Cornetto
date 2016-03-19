var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    "title": {type: String, required: true},
    "description": {type: String, required: true},
    "laneId": { type: mongoose.Schema.Types.ObjectId,required: true },
    "boardId": { type:mongoose.Schema.Types.ObjectId, required: true },
    "members": [
      {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": 'User'
      }
    ],
    "checkLists": [
      {
        "title": {type: String, required: true},
        "checkListItems": [
          {
            "text": {type: String, required: true},
            "checkedState": Boolean,
            "checkedOn": Date,
            "createdOn": Date,
            "modifiedOn": Date,
            "creatorId": mongoose.Schema.Types.ObjectId,
            "assignedToId": mongoose.Schema.Types.ObjectId
          }
        ]
      }
    ],
    "attachments": {
      "cover": mongoose.Schema.Types.ObjectId,
      "items": [
        {
          "name": {type: String, required: true},
          "attachementType": {type: String, required: true},
          "addedBy": {type: String, required: true},
          "idOfThePersonAdded": {type: mongoose.Schema.Types.ObjectId, required: true},
          "addedOn": {type: Date, required: true},
          "path": {type: String, required: true}
        }
      ]
    },
    "topTwentyComments": [{
      "addedById": mongoose.Schema.Types.ObjectId,
      "dateTime": Date,
      "description": String,
      "lastModifiedOn": Date
    }],
    "topTwentyActivites": [{

    }]
},{timestamps: true});

module.exports = mongoose.model('Card',cardSchema,'cards');
