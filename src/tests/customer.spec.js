import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
import db from '../db/models';
import fixture from './fixture';

const {
  validuser, invaliduser, uncompleteuserdata
} = fixture;
chai.use(chaiHttp);

const invalidemail = invaliduser;
invalidemail.email = 'jjjjjj';

const invalidpassword = validuser;
invalidpassword.password = '';

// let testproduct = {};
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
  });
};

describe('Customer Authentication', () => {
  doBeforeEach();
  describe('register new customer', () => {
    it('should signup successfully', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send({
          email: 'goke@gmail.com',
          name: 'tester',
          password: 'gohkman'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.customer).to.be.an('object');
          expect(res.body.customer.name).to.be.equal('tester');
          expect(res.body.customer.email).to.be.equal('goke@gmail.com');
          expect(res.body.customer.password).to.be.equal('gohkman');
        });
      done();
    });

    it('should fail if email is empty ', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invaliduser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
        });
      done();
    });

    it('should fail if email is invalid ', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invalidemail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
        });
      done();
    });

    it('should signup failed if data is incomplete', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(uncompleteuserdata)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
        });
      done();
    });

    it('should signup failed if password is empty', (done) => {
      chai.request(app)
        .post('/api/v1/customers')
        .send(invalidpassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
        });
      done();
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.contain('accessToken');
          expect(res.body).to.contain('customer');
        });
      done();
    });

    // it('should fail if values are invalid', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/customers/login')
    //     .send({
    //       email: 'gokee@gmail.com',
    //       password: 'fishboy666'
    //     })
    //     .end((err, res) => {
    //       console.log('===+++++++', err);
    //       expect(res.status).to.be.equal(400);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body).to.contain('error');
    //       expect(res.body.error).to.contain('status');
    //       expect(res.body.error.message).to.be.equal('Email or Password is invalid.');
    //       expect(res.body.error.code).to.be.equal('USR_01');
    //     });
    //   done();
    // });

    it('should fail if email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/customers/login')
        .send({
          email: 'ibrahim@gmail.com',
          password: 'calory20'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.contain('error');
          expect(res.body.error).to.contain('status');
          expect(res.body.error.message).to.be.equal('The email doesn\'t exist.');
          expect(res.body.error.code).to.be.equal('USR_05');
          expect(res.body.error.field).to.be.equal('email');
        });
      done();
    });

    // it('should login user successfully', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/customers/login')
    //     .send({
    //       email: validuser.email,
    //       password: validuser.password
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.be.equal(200);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body).to.contain('accessToken');
    //       expect(res.body).to.contain('customer');
    //     });
    //   done();
    // });
  });
});
