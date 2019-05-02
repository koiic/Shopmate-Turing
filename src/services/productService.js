import Sequelize from 'sequelize';
import Model from '../db/models';

const { Product } = Model;

console.log('====', Product);

/**
 * @class ProductService
 */
class ProductService {
  /**
   *@description - this method fetch all products
   *@param {object} request
   *@returns {object} -products and product count
   * @static
   * @memberof ProductService
   */
  static async fetchallProduct() {
    console.log('+++I got here ');
    const products = await Product.findOne({
      where: {
        product_id: 1000
      }
    });
    return products;
  }
}

export default ProductService;
