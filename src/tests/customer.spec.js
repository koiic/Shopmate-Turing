import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
import db from '../db/models';
import fixture from './fixture';

const {
  ShippingRegion
} = db;

const {
  validuser, invaliduser, uncompleteuserdata, invalidpassword
} = fixture;
chai.use(chaiHttp);
let token;
const invalidemail = Object.assign(invaliduser);
invalidemail.email = 'jjjjjj';


const customerInfo = {
  address_1: 'south carolina',
  address_2: 'durban',
  city: 'California',
  region: 'West',
  postal_code: '23344',
  country: 'USA',
  shipping_region_id: 1
};


// let testproduct = {};
const doBeforeTest = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await ShippingRegion.create({
      shipping_region_id: 1,
      shipping_region: 'lagos'
    });
  });
};

describe('Customer Tests', () => {
  doBeforeTest();
  describe('register new customer', () => {
    it('should signup successfully', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(validuser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.customer).to.be.an('object');
          expect(res.body.customer.name).to.be.equal('tester');
          expect(res.body.customer.email).to.be.equal('goke@gmail.com');
          token = res.body.accessToken;
          done();
        });
    });

    it('should fail if email is empty ', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invaliduser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should fail if email is invalid ', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invalidemail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should signup failed if data is incomplete', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(uncompleteuserdata)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should signup failed if password is empty', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invalidpassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should signup failed if customer already exist', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(validuser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.be.equal('USR_03');
          expect(res.body.message).to.be.equal('email already exist');
          done();
        });
    });
  });

  describe('authenticate customer', () => {
    it('should login user successfully', (done) => {
      chai.request(app)
        .post('/api/v1/customers/login')
        .send({
          email: 'goke@gmail.com',
          password: 'gohkman'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.customer.customer_id).to.be.equal(1);
          expect(res.body.customer.name).to.be.equal('tester');
          expect(res.body.customer.email).to.be.equal('goke@gmail.com');
          token = res.body.accessToken;
          done();
        });
    });

    it('should fail if email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/customers/login')
        .send({
          email: 'ibrahim@gmail.com',
          password: 'calory20'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Email or Password is invalid.');
          expect(res.body.code).to.be.equal('USR_01');
          expect(res.body.field).to.be.equal('password');
          done();
        });
    });
  });

  describe('Update customer Address Info', () => {
    it('should update customer address successfully', (done) => {
      chai.request(app)
        .patch('/api/v1/customers/address')
        .set('user-key', token)
        .send(customerInfo)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('address_1');
          expect(res.body).to.have.property('address_1', 'south carolina');
          expect(res.body).to.have.property('country', 'USA');
          expect(res.body).to.have.property('city', 'California');
          expect(res.body).to.have.property('email', 'goke@gmail.com');
          done();
        });
    });

    it('should fail if token is invalid', (done) => {
      chai.request(app)
        .patch('/api/v1/customers/address')
        .set('user-key', 'Bearer bjkooooo')
        .send(customerInfo)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.have.property('code');
          expect(res.body).to.include({ field: 'authorization code' });
          expect(res.body.message).to.be.equal('Fail to authenticate token');
          expect(res.body.code).to.be.equal('AUT_03');
          done();
        });
    });

    it('should fail if Bearer does not preceed token ', (done) => {
      chai.request(app)
        .patch('/api/v1/customers/address')
        .set('user-key', 'bjkooooo')
        .send(customerInfo)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.have.property('code');
          expect(res.body).to.include({ field: 'authorization code' });
          expect(res.body.message).to.be.equal('Invalid token supplied');
          expect(res.body.code).to.be.equal('AUT_03');
          done();
        });
    });

    it('should fail if token is not provided', (done) => {
      chai.request(app)
        .patch('/api/v1/customers/address')
        .send(customerInfo)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.have.property('code');
          expect(res.body.field).to.be.equal('NoAuth');
          expect(res.body.message).to.be.equal('Access Unauthorized');
          expect(res.body.code).to.be.equal('AUT_02');
          done();
        });
    });
  });
});
