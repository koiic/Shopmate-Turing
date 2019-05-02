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
      const products = await ProductService.fetchallProduct();
      return res.status(200).json(Message.success('product fetched successfully', products));
    } catch (error) {
      return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
    }
  }
}

export default ProductController;
