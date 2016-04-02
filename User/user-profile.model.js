var mongoose = require('mongoose');
var _ = require('underscore');

// User can login both using email and username
var UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredential'
    },
    username: String, // Slugified name (sreyansjain18)
    displayName: {type:String, required: true}, // name which has to be displayed across the ui (Sreyans Jain)
    email: {type:String, required: true},
    url: String,
    boards: [
        {
            boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
            boardTitle: {type: String,required: true},
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
    initial: {type:String, required: true},
    avatar: String,
    bio: String,
    sessions: [
        {
            deviceName: String,
            deviceId: String,
            deviceType: String
        }
    ]
},{timestamp: true});

var editableProperties = ['displayName','email','initial','avatar'];

UserProfileSchema.statics.createUserProfile = function(profile,cb) {
  try {
    this.create({
      userId: profile.userId,
      username: profile.username,
      displayName: profile.username,
      email: profile.email,
      initial: profile.initial,
      avatar: profile.avatar,
      bio: profile.bio
    },cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

UserProfileSchema.statics.findUserProfile = function(query,cb) {
  try {
    var sort = query.sort ? query.sort : '';
    var limit = query.limit ? query.limit : 0;
    var fields = query.fields ? query.fields : '';
    query = _.pick(query,_.allKeys(this.schema.paths));
    console.log(query);
    query = _.mapObject(query,function(value,key) {
      if(value.indexOf('_') == 0){
        return { $regex: new RegExp(value.substring(1),'g') }
      }
      return value;
    });
    console.log(query);
    this.find(query)
        .select(fields)
        .sort(sort)
        .limit(limit)
        .exec(cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

// Will update only those properties which are editable. Any properties which are passed other than the editable properties will be silently ignored.
UserProfileSchema.statics.modifyUserProfile = function(userId,userProfile,cb) {
  try {
    userProfile = _.pick(userProfile,editableProperties);
    this.findOneAndUpdate({userId: mongoose.Types.ObjectId(userId)},userProfile,{new: true},cb);
  }
  catch(exception) {
    cb(exception,null);
  }
};

UserProfileSchema.statics.removeUserProfile = function(query,cb) {
  try{
    this.remove(query,cb);
  }
  catch(exception) {
    cb(exception,null);
  }
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
