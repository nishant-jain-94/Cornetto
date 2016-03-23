  var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserCredentialSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String // Will be generated using slugify like ashokjain18
    displayName: String,
    username: String,
  },
  facebook: {
    id: String, //Id received from the fb
    token: String,
    displayName: String,
    username: String
  },
  twitter: {
    id: String, //Id as recieved from twitter
    token: String, //token as recieved from twitter
    displayName: String,
    username: String
  }
});

UserCredentialSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
};

UserCredentialSchema.methods.isValid = function(password) {
    return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model("UserCredential",UserCredentialSchema,"userCredentials");
