process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const chai = require('chai');
const chaiHttp = require('chai-http');

//chai assertion styles:
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should;

//local requirements
const app = require('../server');
const Transaction = require('../models/Transaction');

before((done) => {
	mockgoose.prepareStorage().then(() => {
		mongoose.connect('mongodb://example.com/TestingDB', (err) => {
			done(err);
		});
	});
});


describe('/GET transaction', () => {
	it("should GET all transactions", (done) => {
        chai.request(app)
        .get('/api/transaction')
        .end((err, res) => {
            res.should.have.status(200);
        });  
        done();
	});
});

if ( mockgoose.helper.isMocked() === true ) {
   console.log('mockgoose working')
  }