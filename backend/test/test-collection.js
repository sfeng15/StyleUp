var request = require('supertest'),
express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Collection', function(){
  it('creates new collection and responds with json success message', function(done){
    request(app)
    .post('/api/collection')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"collection": {"name":"The average prey size varies geographically; it is only 40 grams (1."}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Collections', function(){
  it('responds with a list of collection items in JSON', function(done){
    request(app)
    .get('/api/collections')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Collection by ID', function(){
  it('responds with a single collection item in JSON', function(done){
    request(app)
    .get('/api/collection/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Collection by ID', function(){
  it('updates collection item in return JSON', function(done){
    request(app)
    .put('/api/collection/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "collection": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Collection by ID', function(){
  it('should delete collection and return 200 status code', function(done){
    request(app)
    .del('/api/collection/'+ _id) 
    .expect(204, done);
  });
});