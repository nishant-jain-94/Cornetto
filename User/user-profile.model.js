var mongoose = require('mongoose');

// User can login both using email and username
var UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredential'
    },
    username: String, // Slugified name (sreyansjain18)
    displayName: String, // name which has to be displayed across the ui (Sreyans Jain)
    email: String,
    url: String,
    boards: [
        {
            boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
            boardTitle: {type: String},
            boardDesc: {type: String},
            boardType: {type: String},
            backgroundColor: {type: String}
        }
    ],
    // cards: [
    //   {
    //     cardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Card'},
    //     cardTitle: {type: String},
    //     boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    //     lanedId: { type: mongoose.Schema.Types.ObjectId },
    //     badges: {
    //       isDescAvailable: Boolean,
    //       checkListItems: Number,
    //       numberOfItemsChecked: Number,
    //       numberOfComments: Number,
    //       isAttachmentAvailable: Boolean
    //     }
    //   }
    // ],
    // teams: [
    //     {
    //         teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    //         teamName: String,
    //         url: String,
    //         boards: [
    //             {
    //                 boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    //                 boardTitle: {type: String},
    //                 boardDesc: {type: String},
    //                 boardType: {type: String}
    //
    //             }
    //         ]
    //     }
    // ],
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
            deviceType: String
        }
    ]
},{timestamp: true});

UserProfileSchema.statics.createUserProfile = function(userId,profile,cb) {
  try {
    this.create({
      userId: userId,
      username: profile.username,
      displayName: profile.username,
      email: profile.email,
      initial: profile.initial,
      avatar: profile.avatar,
      bio: profile.bio
    });
  }
  catch(exception) {
    cb(exception,null);
  }
};

UserProfileSchema.statics.findUserProfile = function(userId,cb) {
  try {
    this.findById({'_id':userId},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

UserProfileSchema.statics.modifyUserProfile = function(userId,userProfile,cb) {
  try {
    this.findByIdAndUpdate(userId,userProfile,cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

UserProfileSchema.statics.deleteUserProfile = function(userId,cb) {
  try{
    this.findByIdAndRemove(userId,cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};


UserProfileSchema.statics.changeAvatar = function(userId,avatar,cb) {
  try {
    this.findByIdAndUpdate(userId,{$set: {avatar: avatar}},cb);
  }
  catch(ex) {
    cb(ex,null);
  }
};

UserProfileSchema.statics.changeUserDetails = function(userDetails,cb) {

};

// UserProfileSchema.statics.addTeam = function(userId,team,cb) {
//   this.findByIdAndUpdate(userId,{$push: {teams: team}},cb);
// };

// UserProfileSchema.statics.addCard = function(userId,card) {
//   try {
//     this.findByIdAndUpdate({'_id':userId},{$push: {
//       cards: card
//     }});
//   }
//   catch(exception) {
//     cb(exception,null);
//   }
// };

UserProfileSchema.statics.addBoard = function(userId,board,cb) {
  try {
    this.findByIdAndUpdate({'_id':userId},{$push: {boards: board}},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

module.exports = mongoose.model('User',UserProfileSchema,'userProfileSchema');
