/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import ProductService from '../services/productService';
import Message from '../utils/messageHelper';
import helper from '../utils/helper.js';

const { getCacheProduct, setCacheProduct } = helper;

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
    const { limit, page, descriptionLength } = req.query;
    try {
      const cacheProducts = await getCacheProduct('cacheKey');
      if (cacheProducts) {
        return res.status(200).json(cacheProducts);
      }
      const products = await ProductService.fetchallProduct({ limit, page, descriptionLength });
      await setCacheProduct('cacheKey', products);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error });
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
    const { product_id: productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({
        message: 'Product id must be a number',
        field: 'product id'
      });
    }
    try {
      const product = await ProductService.fetchSingleProduct(productId);
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).json({
        message: 'Product not found',
        field: 'product id'
      });
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
  static async viewProductByCategory(req, res) {
    const { category_id: categoryId } = req.params;
    if (isNaN(categoryId)) {
      return res.status(400).json({
        message: 'Category id must be a number',
        field: 'category id'
      });
    }
    const { limit, page, description_length: descriptionLength } = req.query;
    const requestObject = {
      categoryId, limit, page, descriptionLength
    };
    try {
      const products = await ProductService.fetchProductsByCategory(requestObject);
      if (!products) {
        return res.status(404).json({
          code: 'CAT_01',
          message: 'Don\'t exist in category with this id',
          field: 'category id'
        });
      }
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
  static async searchProduct(req, res) {
    try {
      const products = await ProductService.searchProduct(req, res);
      return products;
    } catch (error) {
      return res.status(500).json(Message.internalServerError(error));
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} data
   * @memberof ProductController
   */
  static async viewProductByDepartment(req, res) {
    const { department_id: departmentId } = req.params;
    if (isNaN(departmentId)) {
      return res.status(400).json({
        message: 'Department id must be a number',
        field: 'department id'
      });
    }
    const { limit, page, description_length: descriptionLength } = req.query;
    const requestObject = {
      departmentId, limit, page, descriptionLength
    };
    try {
      const products = await ProductService.fetchProductsByDepartment(requestObject);
      if (!products) {
        return res.status(404).json({
          code: 'DEP_02',
          message: 'Department with this id does not exist',
          field: 'department id'
        });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
    }
  }
}

export default ProductController;
