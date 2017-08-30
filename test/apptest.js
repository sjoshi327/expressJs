/*let assert = require("chai").assert
let supertest = require("supertest")

let app=require('../index')

var url = supertest("http://localhost:5555");

describe("testing first route", function(err) {
   it("should test multiplication", function(done) {
       url
           .post("/mul/3/4")
           .end(function(err, res) {
             if (err) throw err
               assert.equal(res.text, 12);
               done();
           });
   });
     it("should test addition", function(done) {
       url
           .post("/add/9/7")
           .end(function(err, res) {
             if (err) throw err
               assert.equal(res.text, 16);
               done();
           });
   });
});*/


let expect = require('chai').expect
let supertest = require('supertest')
let should = require('should')
let express = require('express')
let sinon = require('sinon')
let App = require('../index')

var model=require('../model/schema');


let modelStub = sinon.stub(model,'find')
let modelStub1 = sinon.stub(model.prototype,'save')
let server = supertest.agent('http://localhost/3000')




describe('find data', () => {
   it('respond with json', (done) => {

      modelStub.yields(null,[{bookName: "battle", rating:"5"}])   // this is the response we want
       supertest(App)
           .get('/find')
           .expect('Content-Type',/json/)
           .end((err, res) => {
               if (err) return done(err);
               expect(res.body[0].bookName).to.be.equal("battle");
               done();
           })
   });
});



describe('Insert method test by get',()=>{
it('insert with json', (done) => {
    modelStub.yields(null, [{ bookName : "City", rating: "4.3"}])
    supertest(App)
        .get('/find')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) return done(err);
         
            expect(res.status).to.be.equal(200);
            done();
        })
        });
});

describe('Insert method test',()=>{
    it('insert with json', (done) => {
    modelStub1.yields(null, [{ bookName : "ad java", rating: "4.3"}])
    supertest(App)
        .post('/insert')
        .send({ bookName : "ad java", rating: "4.3"})
        .end((err, res) => {
            if (err) return done(err);
         
            expect(res.status).to.be.equal(200);
            done();
        })
        });
});




describe('DELETE /delete', () => {
   it('should have a status 200', (done) => {
       modelStub.yields(null, [{bookName:"karl",rating:"4"}])
       supertest(App)
           .delete('/delete/karl')
           .end((err, res) => {
               if (err) return done(err);
               expect(res.status).to.be.equal(200);
               //res.should.have.property('status', 200);;
               done();
           });
   })
});












