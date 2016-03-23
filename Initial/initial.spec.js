var mocha = require('mocha');
var should = require('should');
var initial = require('./initial');
console.log(initial);

describe('retrive the initials of the name',function() {
  it('Should retrive the initials of the name',function(done) {
    should.equal(initial.getInitials('Nishant Kumar A Jain'),'NK');
    done();
  });
});

describe('retribe the initials of the name',function() {
  it("should retrive the initials in UpperCase",function(done) {
    should.equal(initial.getInitials('Nishant kumar A Jain'),'NK');
    done();
  });
});
