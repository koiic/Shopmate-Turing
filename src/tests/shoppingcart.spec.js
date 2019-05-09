import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';

let uniqueId;
const productId = 1;
const attributes = 'this is attributes';

chai.use(chaiHttp);

describe('shopping cart test', () => {
  describe('test to generate random unique id', () => {
    it('should generate alphanumeric string', (done) => {
      chai.request(app)
        .get('/api/v1/shoppingcart/generatecartid')
        .end((err, res) => {
          uniqueId = res.body.cart_id;
          expect(res.body.cart_id).to.be.a('string');
          expect(res.body.cart_id.length).to.equal(11);
          done();
        });
    });
  });

  describe('add product to cart', () => {
    // doBeforeEach();
    it('should add to cart successfully', (done) => {
      chai.request(app)
        .post(`/api/v1/shoppingcart/add?cart_id=${uniqueId}&product_id=${productId}&attributes=${attributes}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].item_id).to.be.equal(1);
          expect(res.body[0].name).to.be.equal('Second Product');
          expect(res.body[0].product_id).to.be.equal(1);
          expect(res.body).to.be.an('array');
          expect(res.body[0].price).to.be.equal('800.00');
          done();
        });
    });

    it('should add to cart successfully', (done) => {
      chai.request(app)
        .post(`/api/v1/shoppingcart/add?cart_id=${uniqueId}&product_id=${productId}&attributes=${attributes}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].item_id).to.be.equal(1);
          expect(res.body[0].quantity).to.be.equal(2);
          expect(res.body[0].subtotal).to.be.equal('100.00');
          expect(res.body[0].product_id).to.be.equal(1);
          done();
        });
    });

    it('should fail if product id is invalid', (done) => {
      chai.request(app)
        .post(`/api/v1/shoppingcart/add?cart_id=${uniqueId}&product_id=calory&attributes=${attributes}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.be.equal('Product id must be a number');
          expect(res.body.field).to.be.equal('product id');
          done();
        });
    });

    it('should fail if product id does not exist', (done) => {
      chai.request(app)
        .post(`/api/v1/shoppingcart/add?cart_id=${uniqueId}&product_id=300&attributes=${attributes}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.be.equal('Product not found');
          expect(res.body.field).to.be.equal('product id');
          done();
        });
    });
  });

  describe('fetch products by cartId', () => {
    it('should fetch products successfully', (done) => {
      chai.request(app)
        .get(`/api/v1/shoppingcart/${uniqueId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].item_id).to.be.equal(1);
          expect(res.body[0].name).to.be.equal('Second Product');
          expect(res.body[0].product_id).to.be.equal(1);
          expect(res.body).to.be.an('array');
          expect(res.body[0].price).to.be.equal('800.00');
          done();
        });
    });

    it('should return empty array if cart is not found', (done) => {
      chai.request(app)
        .get('/api/v1/shoppingcart/iooooioo')
        .end((err, res) => {
          console.log(' =>>>>>', res);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('empty shopping cart by cartId', () => {
    it('should empty cart successfully', (done) => {
      chai.request(app)
        .delete(`/api/v1/shoppingcart/empty/${uniqueId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return empty array if cart is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/shoppingcart/empty/iooooioo')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
