/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import Model from '../db/models';
import PaginationHelper from '../utils/paginationHelper';

const { Product, Category } = Model;

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
    const queries = {
      limit,
      page,
      descriptionLength,
    };
    try {
      const data = await PaginationHelper.paginationHelper(Product, queries);
      return data;
    } catch (error) {
      return error;
    }
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

  /**
   *@description - this method fetch products by their category
   *@param {object} request
   *@param {object} response
   *@returns {object} -products and product count
   * @static
   * @memberof ProductService
   */
  static async fetchProductsByCategory(request, response) {
    const { category_id: categoryId } = request.params;
    if (isNaN(categoryId)) {
      return response.status(400).json({
        message: 'Category id must be a number',
        field: 'category id'
      });
    }
    const { limit, page, descriptionLength } = request.query;
    try {
      const category = await Category.findOne({
        where: { category_id: categoryId },
        include: [{
          model: Product,
          attributes: [
            'product_id',
            'name',
            'description',
            'price',
            'discounted_price',
          ],
          through: { attributes: [] },
        }]
      });
      if (!category) {
        return response.status(404).json({
          code: 'CAT_01',
          message: 'Don\'t exist in category with this id',
          field: 'category id'
        });
      }
      let rows = [];
      rows = PaginationHelper.paginateResource(category.Products, page, limit);
      if (descriptionLength) {
        rows = PaginationHelper.stripRowByDescription(rows, descriptionLength);
      }
      const count = category.Products.length;
      return response.status(200).json({ count, rows });
    } catch (error) {
      return error;
    }
  }
}

export default ProductService;
