process.env.FACTLY = 'test';
var config = require('../server/config');
var db;

xdescribe("Database layer:", function() {

  var user1 = {
    name: 'ian',
    pw: 'ian123',
    k1: '漢字',
    k2: '株式会社',
    k3: '字幕',
  };

  var user2 = {
    name: 'bob',
    pw: 'bob123',
  };

  // Setup
  beforeAll(function(){
    db = require('../server/db');
  });



  // Teardown
  afterAll(function(){
    var fs = require('fs');
    fs.unlink(config.file);
  });

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
  it('should properly add a user', function(done) {
    db.addNewUser_(user1.name, user1.pw)
      .then(function(user){
        expect(user.id).toBeDefined();
        expect(user.name).toEqual(user1.name);
        done();
      });
  });
  it('should return data on added users', function(done) {
    db.checkUser_(user1.name, user1.pw)
      .then(function(user){
        expect(user).toBeDefined();
        expect(user.exists).toEqual(true);
        expect(user.data.name).toEqual(user1.name);
        expect(user.data.id).toBeDefined();
        done();
      });
  });
  it('should not allow an unregistered user to log in', function(done) {
    db.checkUser_(user2.name, user2.pw)
      .then(function(user){
        expect(user.exists).toEqual(false);
        expect(user.data).toEqual(null);
        done();
      });
  });
  it('should add kanji properly and in order', function(done) {
    db.checkUser_(user1.name, user1.pw)
      .then(function(data){
        db.addWord_2(data.id, user1.k1)
          .then(function(added){
            expect(added).toBe(true);
            done();
          });
      });
  });
});