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

  describe('Create a new User',function() {
    it('should create a new user',function(done) {
      userProfile.createUserProfile(user,function(error,profile){
        should.equal(user.username,profile.username);
        done();
      });
    });
  });

  describe('Find a user profile',function() {
    it('should find a user by userId',function(done) {
      userProfile.findUserProfile('4edd40c86762e0fb12000003',function(error,profile) {
        should.equal(user.username,profile.username);
        done();
      });
    });
  });

  describe('Find a user profile by emailId',function() {
    it('should retrive a user existing with that user id',function(done) {
      userProfile.findUserProfile({email:'nishantjain94@live.com'},function(error,profile) {
        console.log('printing profile...');
        console.log(error,profile);
        done();
      });
    });
  });

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
        console.log(error,profile);
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
        console.log(error,profile);
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
