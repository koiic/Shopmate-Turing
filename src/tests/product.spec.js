import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
import db from '../db/models';

const { Product } = db;
chai.use(chaiHttp);

let testproduct = {};

const doBeforeEach = () => {
  beforeEach(async () => {
    await db.sequelize.sync({
      force: true
    });
    testproduct = await Product.create({
      product_id: 1,
      name: 'Second Product',
      description: 'New Populated Second products in seeded database',
      price: 800.00,
      discounted_price: 750.00,
    });
  });
};

describe('product tests', () => {
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
