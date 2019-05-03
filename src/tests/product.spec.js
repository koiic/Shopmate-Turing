import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
import db from '../db/models';

const { Product } = db;
chai.use(chaiHttp);

// let testproduct = {};

const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Product.create({
      product_id: 1,
      name: 'Second Product',
      description: 'New Populated Second products in seeded database',
      price: 800.00,
      discounted_price: 750.00,
    });
  });
};
describe('product test', () => {
  describe('fetch all products', () => {
    doBeforeEach();
    it('should fetch all products', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });
  });

  describe('fetch a single product', () => {
    doBeforeEach();
    it('should fetch single product by product_id successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should not fetch single product if product_id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/products/tyuuu')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not fetch single product if product_id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/products/200')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
