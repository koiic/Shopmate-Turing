import ProductService from '../services/productService';
import Message from '../utils/messageHelper';
/**
 * @class ProductController
 */
class ProductController {
  /**
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} data
     * @memberof ProductController
     */
  static async viewAllProduct(req, res) {
    try {
      const products = await ProductService.fetchallProduct(req);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} data
   * @memberof ProductController
   */
  static async viewSingleProduct(req, res) {
    console.log('i got here');
    try {
      return await ProductService.fetchSingleProduct(req, res);
    } catch (error) {
      return res.status(500).json(Message.internalServerError(error));
    }
  }
}

export default ProductController;
