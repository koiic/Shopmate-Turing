import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../../index';
// import db from '../db/models';
// import fixture from './fixture';

chai.use(chaiHttp);

describe('shopping cart test', () => {
  describe('test to generate random unique id', () => {
    it('should generate alphanumeric string', (done) => {
      chai.request(app)
        .get('/api/v1/shoppingcart/generatecartid')
        .end((err, res) => {
          console.log('=====', res);
          expect(res.body.cart_id).to.be.a('string');
          expect(res.body.cart_id.length).to.equal(11);
          done();
        });
    });
  });
});
