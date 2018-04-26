const chai = require("chai");
const should = chai.should();
const	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
  Store = mongoose.model('Store'),
	agent = request.agent(app);

 before(function(done) { //Before each test we empty the database
    Store.remove({}, function(){
      done();
    });
 })

 describe('Save & Update Store Object to the DB', function () {
   const testKey = "key";
   const testVal = "value";
    it("Should return save Store as the response!",function(done){
      const store = {testKey:testVal};
      agent.post('/object')
        .send(store)
        .expect(200)
        .end(function(err, result){
          result.body.should.have.property('timestamp');
          done();
        })
      })

      it("Update value of existing Key!", function(){
        const testVal2 = "value2";
        const store2 = {testKey:testVal2};
        agent.post('/object')
          .send(store2)
          .expect(200)
          .end(function(err, result){
            result.body.value.should.equal(testVal2);
          })
      })
 })

 describe('Get the Key Value for given Key', function () {
   const testGKey = "testGKey";
   const testGVal = "testGVal";
   before(function(done){
     const store1 = {testGKey:testGVal};
     agent.post('/object')
       .send(store1)
       .expect(200)
       .end(function(err, result){
         result.body.value.should.equal(testGVal);
         done();
      })
   })

   it("Should return the value for given key!",function(done){
      agent.get('/object/'+testGKey)
        .expect(200)
        .end(function(err, result){
          // result.body.should.have.property('_id');
          result.body.value.should.equal('testGVal');
          done();
        })
    })

		it("Should return last updated value for given timestamp",function(done){
			agent.get('/object/'+testGKey+'?timestamp=1524762175164')
        .expect(200)
        .end(function(err, result){
          // result.body.should.have.property('_id');
          result.body.value.should.equal('value2');
          done();
        })
		})
 })

 describe("No Key found in the DB", function(){
	it("No Key found in the DB", function(done){
    const noIdKey = "noIdKey";
		agent.get('/object/'+noIdKey)
		.expect(200)
		.end(function(err, result){
			result.body.should.have.property('message');
			done();
		})
	})
 })