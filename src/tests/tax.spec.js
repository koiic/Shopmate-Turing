import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';

import db from '../db/models';
import fixture from './fixture';

const { Tax } = db;
const { newtax } = fixture;
chai.use(chaiHttp);

// let testproduct = {};
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Tax.create(newtax);
  });
};

describe('tax test', () => {
  doBeforeEach();
  describe('fetch all tax', () => {
    it('should return array of tax object', (done) => {
      chai.request(app)
        .get('/api/v1/tax')
        .end((err, res) => {
          expect(res.body[0]).to.have.property('tax_id', 1);
          expect(res.body[0]).to.have.property('tax_type', 'Sales Tax at 8.5%');
          expect(res.body[0]).to.have.property('tax_percentage', '8.50');
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it('should return a single tax object successfully', (done) => {
      chai.request(app)
        .get('/api/v1/tax/1')
        .end((err, res) => {
          expect(res.body).to.have.property('tax_id', 1);
          expect(res.body).to.have.property('tax_type', 'Sales Tax at 8.5%');
          expect(res.body).to.have.property('tax_percentage', '8.50');
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it('should fail if tax id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/tax/invalidtax')
        .end((err, res) => {
          expect(res.body).to.have.property('message', 'Invalid tax id');
          expect(res.body).to.have.property('field', 'tax id');
          expect(res.status).to.be.equal(400);
          done();
        });
    });

    it('should return null if tax id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/tax/100')
        .end((err, res) => {
          expect(res.body).to.be.equal(null);
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });
});
