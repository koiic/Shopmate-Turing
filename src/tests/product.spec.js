import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
import db from '../db/models';
import fixture from './fixture';

const {
  Product, Category, Department, ProductCategory
} = db;
const {
  newproduct, newcategory, newdepartment, newproductcategory
} = fixture;
chai.use(chaiHttp);

// let testproduct = {};
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Promise.all([
      Product.create(newproduct),
      Department.create(newdepartment),
      Category.create(newcategory),
      ProductCategory.create(newproductcategory)
    ]);
  });
};
describe('product test', () => {
  doBeforeEach();
  describe('fetch all products', () => {
    // doBeforeEach();
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
    // doBeforeEach();
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

  describe('fetch product by category', () => {
    // doBeforeEach();
    it('should return products based on categoryId successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/inCategory/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });

    it('should return empty row if category id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/products/inCategory/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.be.equal('CAT_01');
          done();
        });
    });

    it('should fail if category id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/products/inCategory/invalidId')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Category id must be a number');
          expect(res.body.field).to.be.equal('category id');
          done();
        });
    });

    it('should return strip product description based on description length successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/inCategory/1?limit=1&description_length=20')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          expect(res.body.rows[0].description).to.have.lengthOf.below(20 + 5);
          done();
        });
    });
  });

  describe('search product', () => {
    it('should return product successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/search?query_string=Second Product&all_words=on')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });

    it('should return product failed if query string does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/products/search?query_string=gggggg')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(0);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });

    it('should return all product that contains the query-string successfully ', (done) => {
      chai.request(app)
        .get('/api/v1/products/search?query_string=Second Product&all_words=on')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });
  });

  describe('fetch product by department', () => {
    // doBeforeEach();
    it('should return products based on department id successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/inDepartment/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });

    it('should return empty row if department id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/products/inDepartment/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.be.equal('DEP_02');
          done();
        });
    });

    it('should fail if department id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/products/inDepartment/invalidId')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Department id must be a number');
          expect(res.body.field).to.be.equal('department id');
          done();
        });
    });

    it('should return strip product description based on description length successfully', (done) => {
      chai.request(app)
        .get('/api/v1/products/inDepartment/1?limit=1&description_length=20')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          expect(res.body.rows[0].description).to.have.lengthOf.below(20 + 5);
          done();
        });
    });
  });
});
