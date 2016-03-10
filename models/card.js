var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    "title": String,
    "laneId": mongoose.Schema.Types.ObjectId,
    "boardId": mongoose.Schema.Types.ObjectId,
    "members": [
      {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": 'User'
      }
    ],
    "checkLists": [
      {
        "title": String,
        "checkListItems": [
          {
            "text": String,
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
          "name": String,
          "attachementType": String,
          "addedBy": String,
          "idOfThePersonAdded": mongoose.Schema.Types.ObjectId,
          "addedOn": Date,
          "path": String
        }
      ]
  },
    "comments": [{
      "addedById": mongoose.Schema.Types.ObjectId,
      "dateTime": Date,
      "description": String,
      "lastModifiedOn": Date
    }]
});

module.exports = mongoose.model('Card',cardSchema,'cards');
