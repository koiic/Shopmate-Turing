import Model from '../db/models';
import paginationHelper from '../utils/paginationHelper';

const { Product } = Model;

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

  /**
   *@description - this method fetch single product
   *@param {object} request
   *@param {object} response
   *@returns {object} -product and product count
   * @static
   * @memberof ProductService
   */
  static async fetchSingleProduct(request, response) {
    const { product_id: productId } = request.params;
    if (isNaN(productId)) {
      return response.status(400).json({
        message: 'Product id must be a number',
        field: 'product id'
      });
    }
    const product = await Product.findOne({
      where: {
        product_id: productId
      }
    });
    if (product) {
      return response.status(200).json(product);
    }
    return response.status(404).json({
      message: 'Product not found',
      field: 'product id'
    });
  }
}

export default ProductService;
