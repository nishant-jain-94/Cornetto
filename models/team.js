var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    "id": mongoose.Schema.Types.ObjectId,
    "teamName": String,
    "members": [
      {
        "id": String
      }
    ],
    "boards": [
      {
        "id": String
      }
    ],
    "permissionLevelBoard": String,
    "pref": {
      "backgroundColor": String,
      "backgroundImage": String,
      "coverImage": String
    }
});

module.exports = mongoose.model('Team',TeamSchema,'teams');
