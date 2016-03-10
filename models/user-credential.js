  var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserCredentialSchema = new mongoose.Schema({
  email: String,
  displayName: String,
  username: String,
  local: {
    password: String // Will be generated using slugify like ashokjain18
  },
  facebook: {
    id: String, //Id received from the fb
    token: String
  },
  twitter: {
    id: String, //Id as recieved from twitter
    token: String //token as recieved from twitter
  }
});

UserCredentialSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
};

UserCredentialSchema.methods.isValid = function(password) {
    return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model("UserCredential",UserCredentialSchema,"userCredentials");
