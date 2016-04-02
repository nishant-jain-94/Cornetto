const mocha = require('mocha');
const mongoose = require('mongoose');
// const sinon = require('sinon');
// const supertest = require('supertest');
const expect = require('chai').expect;
const should = require('should');
const config = require('../config/db.config.js')[process.env.NODE_ENV];

// const app = require('../bin/app');
const userProfile = require('./user-profile.model.js');

if(process.env.NODE_ENV !== 'development') {
  console.log('The current node env is ' + process.env.NODE_ENV + ' and may cause damages.' );
  process.exit(1);
}


describe('User Model', function() {

  before(function(done) {
    if(mongoose.connection.db) {
      return done();
    }
    mongoose.connect(config.db,done);
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });

  var user = {
    userId: '4edd40c86762e0fb12000003',
    username: 'nishantjain94',
    displayName: 'Nishant Jain',
    email: 'nishantjain94@live.com',
    initial: 'NJ',
    avatar: '',
    bio: ''
  };

  var user2 = {
    userId: '5edd40c86762e0fb12000003',
    username: 'nishantjain95',
    displayName: 'Nishant Jain 95',
    email: 'nishantjain95@live.com',
    initial: 'NJ',
    avatar: '',
    bio: ''
  };

  describe('Create a new User',function() {
    it('should create a two new users',function(done) {
      userProfile.createUserProfile(user,function(error,profile){
        should.equal(user.username,profile.username);
        userProfile.createUserProfile(user2,function(error,profile){
          should.equal(user2.username,profile.username);
          done();
        });
      });
    });
  });

  describe('Find a user profile by userId',function() {
    it('should retrive a user profile with the matching userId',function(done) {
      userProfile.findUserProfile({userId:user.userId},function(error,profile) {
        should.equal(user.username,profile[0].username);
        done();
      });
    });
  });

  describe('Find a user profile by emailId',function() {
    it('should retrive a user existing with matching emailId',function(done) {
      userProfile.findUserProfile({email:'nishantjain94@live.com',fields: 'username displayName'},function(error,profile) {
        should.equal(user.username,profile[0].username);
        done();
      });
    });
  });

  describe('Find a user profile which matches the pattern',function() {
    it('should retrieve all the users matching the pattern with username and displayName',function(done) {
      userProfile.findUserProfile({username:'_nish',fields:'username displayName'},function(error,profile) {
        done();
      });
    });
  })

  describe('Update a user profile',function(){
    it('should update the user profile',function(done) {
      var updatedUserProfile = {
        userId: '4edd40c86762e0fb12000003',
        username: 'nishantjain94',
        displayName: 'Nishant Kumar A Jain',
        email: 'nishantjain94@live.com',
        initial: 'NJ',
        avatar: '',
        bio: ''
      };

      var updatedProfile = {
          displayName: 'Nishant Jain'
      };
      userProfile.modifyUserProfile('4edd40c86762e0fb12000003',updatedProfile,function(error,profile) {
        should.equal(profile.displayName,'Nishant Jain');
        done();
      });
    });
  });

  describe('Update a user profile',function() {
    it('should omit the properties which cannot be editable',function(done) {
      var updatedProfile = {
        userId: '4edd40c86762e0fb12000004'
      };
      userProfile.modifyUserProfile('4edd40c86762e0fb12000003',updatedProfile,function(error,profile) {
        should.notEqual(profile.userId,'4edd40c86762e0fb12000004');
        done();
      })
    });
  });

  describe('Remove a user profile',function() {
    it('should remove the user profile',function(done) {
      userProfile.removeUserProfile({userId:"4edd40c86762e0fb12000003"},function(error,profile){
        //console.log(error,profile);
        userProfile.findUserProfile({userId:"4edd40c86762e0fb12000003"},function(error,profile) {
          should(profile).be.null;
          done();
        })
      });
    });
  });

});
