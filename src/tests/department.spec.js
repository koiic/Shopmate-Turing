import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';

import db from '../db/models';
import fixture from './fixture';

const { Department } = db;
const { newdepartment } = fixture;
chai.use(chaiHttp);

// let testproduct = {};
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Department.create(newdepartment);
  });
};

describe('department test', () => {
  doBeforeEach();
  describe('fetch all departments', () => {
    it('should return array of departments', (done) => {
      chai.request(app)
        .get('/api/v1/departments')
        .end((err, res) => {
          expect(res.body[0]).to.have.property('department_id', 1);
          expect(res.body[0]).to.have.property('name', 'Regional');
          expect(res.body[0]).to.have.property('description', 'no description');
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it('should return a single department object successfully', (done) => {
      chai.request(app)
        .get('/api/v1/departments/1')
        .end((err, res) => {
          expect(res.body).to.have.property('department_id', 1);
          expect(res.body).to.have.property('name', 'Regional');
          expect(res.body).to.have.property('description', 'no description');
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it('should fail if department id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/departments/invaliddepartment')
        .end((err, res) => {
          expect(res.body).to.have.property('message', 'Invalid department id');
          expect(res.body).to.have.property('field', 'department id');
          expect(res.status).to.be.equal(400);
          done();
        });
    });

    it('should fail if department id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/departments/100')
        .end((err, res) => {
          expect(res.body.error).to.be.have.property('code', 'DEP_02');
          expect(res.body.error).to.be.have.property('message', 'Don\'exist department with this ID.');
          expect(res.body.error).to.be.have.property('field', 'department_id');
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });
});
