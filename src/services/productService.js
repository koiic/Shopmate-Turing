import Model from '../db/models';
import paginationHelper from '../utils/paginationHelper';

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
  static async fetchallProduct(request) {
    const { limit, page, descriptionLength } = request.query;
    const data = paginationHelper(Product, { limit, page, descriptionLength });
    return data;
  }
}

export default ProductService;
