let expect = require('chai').expect
let supertest = require('supertest')
let should = require('should')
let express = require('express')
let sinon = require('sinon')
let App = require('../index')

var model=require('../model/schema');


let modelStub = sinon.stub(model,'find')
let modelStub1 = sinon.stub(model.prototype,'save')
/*let modelstub2 = sinon.stub(model,'delete')*/
let server = supertest.agent('http://localhost/3000')




describe('find data', () => {
   it('respond with json', (done) => {

      modelStub.yields(null,[{bookName: "battleship", rating:"8"}])   // this is the response we want
       supertest(App)
           .get('/find')
           .expect('Content-Type',/json/)
           .end((err, res) => {
               if (err) return done(err);
               expect(res.body[0].bookName).to.be.equal("battleship");
               done();
           })
   });
});



describe('Insert method test by get',()=>{
it('insert with json', (done) => {
    modelStub1.yields(null, [{ bookName : "Silent City", rating: "7"}])
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

describe('DELETE /delete', () => {
   it('should have a status 200', (done) => {
       modelStub.yields(null, [{bookName:"karl",rating:"4"}])
       supertest(App)
           .delete('/delete/karl')
           .end((err, res) => {
               if (err) return done(err);
               expect(res.status).to.be.equal(200);
               done();
           });
   })
});


describe('Delete', () => {
   beforeEach(() => {      
       modelStub1.withArgs({'bookName' : "history"})
       .yields(null, {
  "ok": 1,
  "nModified": 1,
  "n": 1
});
   })
   it('Delete/delete', (done) => {
     
       supertest(App)
           .delete('/delete/history')
           .end((err, res) => {
             if (err) return done(err);
              done();
         
           });
   });
});


describe('Update', () => {
   beforeEach(() => {      
       modelStub1.withArgs({'bookName' : "Snowman"}, {$set : {'bookName' : "Snowman-2"}})
       .yields(null,{
  "ok": 1,
  "nModified": 1,
  "n": 1
});
   })
   it('update/Put', (done) => {
          supertest(App)
           .put('/update/Snowman')
           .send({'movieName' : "Snowman-2"})
           .end((err, res) => {
               if (err) return done(err);
               else {
              expect(res.body.ok).to.be.equal(1);
              console.log("hello shilkhar")
               done();
           }
           })
   })
});










