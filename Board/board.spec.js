var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var mongoose = require('mongoose');
var should = require('should');

var app = require('../bin/www');
var board = require('../board/board.model');
var createStub = sinon.stub(board,'create');
var findByIdStub = sinon.stub(board,'findById');
var updateStub = sinon.stub(board,'update');

request = request('http://localhost:8080');

describe('Create a new Board',function() {

  describe('#add a new board', function() {

    beforeEach(function() {
      createStub.yields(null,{
        "_id" : "56e3a97450f83be1329ab080",
        "updatedAt" : "2016-03-12T05:30:28Z",
        "createdAt" : "2016-03-12T05:30:28Z",
        "name" : "Test Board",
        "members" : [ ],
        "lanes" : [ ],
        "prefs" : {
                "comments" : "Public",
                "permissionLevel" : "Public",
                "backgroundColor" : "Blue"
        },
        "__v" : 0 });
    });

    afterEach(function() {
      board.create.restore();
    });

    it("should add the new board",function(done) {
      request
        .post('/boards/create')
        .send({
          name: 'Test Board',
          prefs: {
            backgroundColor: 'Blue',
            permissionLevel: 'Public',
            comments: 'Public'
          }
        })
        .end(function(error,response) {
          if(error)
            return done(error);
          else {
            expect(response.body.name).to.be.equal('Test Board');
            expect(response.body.prefs.backgroundColor).to.be.equal('Blue');
            expect(response.body.prefs.permissionLevel).to.be.equal('Public');
            expect(response.body.prefs.comments).to.be.equal('Public');
            return done();
          }
        });
    }); // end of should add new board
  }); //end of describe adding a new board

  describe('#add a new board without name', function() {
    it('should throw an exception', function(done) {
      request
        .post('/boards/create')
        .send({
          name: '',
          prefs: {
            backgroundColor: 'Blue',
            permissionLevel: 'Public',
            comments: 'Public'
          }
        })
        .expect(500,'Board validation failed',done);
    });
  });

  describe('#add a new board without preferences', function() {
    it("should throw an exception", function(done) {
          request
            .post('/boards/create')
            .send({name: ''})
            .expect(500,'Recieved a request with empty preferences',done);
    });
  });

  describe('#get an existing board',function() {

    beforeEach(function() {
      findByIdStub
        .withArgs(mongoose.Types.ObjectId('56e3a97450f83be1329ab080'))
        .yields(null,{"_id" : "56e3a97450f83be1329ab080",
        "updatedAt" : "2016-03-12T05:30:28Z",
        "createdAt" : "2016-03-12T05:30:28Z",
        "name" : "Test Board",
        "members" : [ ],
        "lanes" : [ ],
        "prefs" : {
                "comments" : "Public",
                "permissionLevel" : "Public",
                "backgroundColor" : "Blue"
        },
        "__v" : 0 });
      });

    afterEach(function() {
      board.findById.restore();
    });

    it('should a get the board details',function(done) {
      request
        .get('/boards/56e3a97450f83be1329ab080')
        .end(function(error,response) {
          expect(response.body._id).to.be.equal('56e3a97450f83be1329ab080');
          expect(response.body.name).to.be.equal('Test Board');
          return done();
        });
    });

  });

  describe('#a request with invalid boardId',function() {
    it('should throw an exception',function(done) {
      request
        .get('/boards/56e3a97450f83be1329ass08b')
        .expect(500,"Argument passed in must be a single String of 12 bytes or a string of 24 hex characters",done);
    });
  });

  describe("#add a new lane",function() {
    var findByIdAndUpdateStub = sinon.stub(board,'findByIdAndUpdate');
    beforeEach(function() {
      findByIdAndUpdateStub.withArgs(mongoose.Types.ObjectId('56e3a97450f83be1329ab080'),{$push:{lanes:{name: 'Test Lane'}}},{new: true}).yields(null,{"_id" : "56e3a97450f83be1329ab080",
      "updatedAt" : "2016-03-12T05:30:28Z",
      "createdAt" : "2016-03-12T05:30:28Z",
      "name" : "Test Board",
      "members" : [ ],
      "lanes" : [{
        "_id": '56e3a97450f83be1329ab082',
        "name": "Test Lane",
        "cards": [ ],
        "_v": 0
      }],
      "prefs" : {
              "comments" : "Public",
              "permissionLevel" : "Public",
              "backgroundColor" : "Blue"
      },
      "__v" : 0 });
    });

    afterEach(function() {
      board.findByIdAndUpdate.restore();
    });

    it("should add a new lane to the board",function(done) {
      request
        .post('/boards/l/add')
        .send({boardId:'56e3a97450f83be1329ab080',laneName:'Test Lane'})
        .end(function(error,response) {
          expect(response.body.lanes[0].name).to.be.equal('Test Lane');
          done();
        });
    });
  });

  describe("#update the lane Title",function() {
    beforeEach(function() {
      updateStub.withArgs(
        {'lanes._id':mongoose.Types.ObjectId('56e3a97450f83be1329ab082')},
        {'$set': {'lanes.$.name' : 'Updated Test Lane'}}).yields(null,
          {"_id" : "56e3a97450f83be1329ab080",
      "updatedAt" : "2016-03-12T05:30:28Z",
      "createdAt" : "2016-03-12T05:30:28Z",
      "name" : "Test Board",
      "members" : [ ],
      "lanes" : [{
        "_id": '56e3a97450f83be1329ab082',
        "name": "Updated Test Lane",
        "cards": [ ],
        "_v": 0
      }],
      "prefs" : {
              "comments" : "Public",
              "permissionLevel" : "Public",
              "backgroundColor" : "Blue"
      },
      "__v" : 0 });
    });

    afterEach(function() {
      board.update.restore();
    });

    it('Should update the name of the lane',function(done) {
      request
        .post('/boards/l/updateTitle')
        .send({
          laneId: '56e3a97450f83be1329ab082',
          laneName: 'Updated Test Lane'
        })
        .end(function(error,response) {
          if(error)
            return done(error);
          expect(response.body.lanes[0].name).to.be.equal('Updated Test Lane');
          return done();
        });
    });
  });

  describe("#update board Title",function() {
    beforeEach(function() {
      findByIdAndUpdateStub = sinon.stub(board,'findByIdAndUpdate');
      findByIdAndUpdateStub.
      withArgs(
        mongoose.Types.ObjectId('56e3a97450f83be1329ab080'),
        {'name': 'Updated Test Board'},
        {new: true})
        .yields(null, {
          "_id" : "56e3a97450f83be1329ab080",
          "updatedAt" : "2016-03-12T05:30:28Z",
          "createdAt" : "2016-03-12T05:30:28Z",
          "name" : "Updated Test Board",
          "members" : [ ],
          "lanes" : [{
            "_id": '56e3a97450f83be1329ab082',
            "name": "Updated Test Lane",
            "cards": [ ],
            "_v": 0
          }],
          "prefs" : {
                  "comments" : "Public",
                  "permissionLevel" : "Public",
                  "backgroundColor" : "Blue"
          },
          "__v" : 0
      });
    });

    afterEach(function() {
      board.findByIdAndUpdate.restore();
    });

    it("Should update the name of the board",function(done) {
      request
        .post('/boards/updateTitle')
        .send({
          boardId: '56e3a97450f83be1329ab080',
          boardName: 'Updated Test Board'
        })
        .end(function(error,response) {
          if(error)
            return done(error);
          expect(response.body.name).to.be.equal('Updated Test Board');
          return done();
        });
    });
  });
}); // end of describe Board
