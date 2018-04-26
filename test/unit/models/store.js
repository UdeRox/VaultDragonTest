const chai = require("chai");
const sinon = require('sinon');
const should = chai.should();
const expect = chai.expect;
const Store = require("../../../models/store");
require('sinon-mongoose');
// const server = require("../../..app");

describe('KeyStore Controller API testing', function(){
  context('Save new Key Value to the DB', function(){
    it("It should create new Key Value and return", function(){
      const MockStore = sinon.mock(new Store({key:"key1",value:"Value1"}));
      const store = MockStore.object;
      const expectResult = {status:true};
      MockStore.expects('save').yields(null, expectResult);
      store.save(function (err, result){
        MockStore.verify();
        MockStore.restore();
        expect(result.status).to.be.true;

      })
    });

    it("It should create new Key Value and return", function(){
      const MockStore = sinon.mock(new Store({key:"key1",value:"Value1"}));
      const store = MockStore.object;
      const expectResult = {status:false};
      MockStore.expects('save').yields(expectResult, null);
      store.save(function (err, result){
        MockStore.verify();
        MockStore.restore();
        expect(err.status).to.not.be.true;
      })
    })
  })
})
