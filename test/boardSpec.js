var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../bin/www');
request = request('http://localhost:8080');

describe('Board',function() {
  describe('#add a new board',function() {
    it("should add the new board",function() {
      request
        .post('/boards/create')
        .send({name: 'Test Board',prefs: {
          backgroundColor: 'Blue',
          permissionLevel: 'Public',
          comments: 'Public'
        }})
        .expect(200)
        .end(function(error,response) {
          if(err)
            return done(err);
          else {
            expect(response.body.name).to.be.equal('Test Board');
            expect(response.body.prefs.backgroundColor).to.be.equal('Blue');
            expect(response.body.prefs.permissionLevel).to.be.equal('Public');
            expect(response.body.prefs.comments).to.be.equal('Public');
            return done();
          }
        });
    });
  });

  describe("");
});
