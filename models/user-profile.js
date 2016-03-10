var mongoose = require('mongoose');

// User can login both using email and username
var UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    username: String, // Slugified name (sreyansjain18)
    displayName: String, // name which has to be displayed across the ui (Sreyans Jain)
    email: String,
    url: String,
    local: {
        password: String
    },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board'
        }
    ],
    teams: [
        {
            name: String,
            url: String,
            boards: [
                {
                    name: String,
                    url: String,
                    backgroundColor: String
                }
            ]
        }
    ],
    initial: String,
    avatar: String,
    bio: String,
    emailAddress: [
        {
            emailId: String,
            addedOn: Date
        }
    ],
    sessions: [
        {
            deviceName: String,
            deviceId: String,
            deviceType: String,
        }
    ],
    accountcreatedOn: Date,
    emailNotifications: String
});

UserProfileSchema.statics.findUser = function(userId,cb) {
  return this.find({'_id':userId},cb);
}

module.exports = mongoose.model('User',UserProfileSchema,'userProfileSchema');
