import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';

import db from '../db/models';
import fixture from './fixture';

const { Category, Department } = db;
const { newcategory, newdepartment } = fixture;
chai.use(chaiHttp);

// let testcategory = {};
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Promise.all([
      Department.create(newdepartment),
      Category.create(newcategory),
    ]);
  });
};

describe('category test', () => {
  doBeforeEach();
  describe('fetch all categories', () => {
    it('should return array of categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });

    it('should return a single category successfully', (done) => {
      chai.request(app)
        .get('/api/v1/categories/1')
        .end((err, res) => {
          expect(res.body).to.have.property('category_id', 1);
          expect(res.body).to.have.property('name', 'French');
          expect(res.body).to.have.property('description', 'the italian matchers');
          expect(res.body).to.have.property('department_id', 1);
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it('should fail if category id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/categories/invalidcategory')
        .end((err, res) => {
          expect(res.body).to.have.property('message', 'Invalid category id');
          expect(res.body).to.have.property('field', 'category id');
          expect(res.status).to.be.equal(400);
          done();
        });
    });

    it('should fail if category id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/categories/100')
        .end((err, res) => {
          expect(res.body.error).to.be.have.property('code', 'CAT_02');
          expect(res.body.error).to.be.have.property('message', 'Don\'exist category with this ID.');
          expect(res.body.error).to.be.have.property('field', 'category id');
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });
});
