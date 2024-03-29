/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

import Sequelize from 'sequelize';
import Model from '../db/models';
import PaginationHelper from '../utils/paginationHelper';

const { Op } = Sequelize;


const { Product, Category, Department } = Model;

/**
 * @class ProductService
 */
class ProductService {
  /**
   *@description - this method fetch all products
   *@param {object} requestObject
   *@returns {object} -products and product count
   * @static
   * @memberof ProductService
   */
  static async fetchallProduct(requestObject) {
    const { limit, page, descriptionLength } = requestObject;
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
   *@param {int} productId
   *@returns {object} -product and product count
   * @static
   * @memberof ProductService
   */
  static async fetchSingleProduct(productId) {
    try {
      const product = await Product.findOne({
        where: {
          product_id: productId
        }
      });
      if (product) {
        return product;
      }
      return null;
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method fetch products by their category
   *@param {object} requestObj
   *@returns {object} -products and product count
   * @static
   * @memberof ProductService
   */
  static async fetchProductsByCategory(requestObj) {
    const {
      limit, page, descriptionLength, categoryId
    } = requestObj;
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
        return null;
      }
      let rows = [];
      rows = PaginationHelper.paginateResource(category.Products, page, limit);
      if (descriptionLength) {
        rows = PaginationHelper.stripRowByDescription(rows, descriptionLength);
      }
      const count = category.Products.length;
      return { count, rows };
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method fetch single product
   *@param {object} request
   *@param {object} response
   *@returns {object} -product and product count
   *@static
   *@memberof ProductService
   */
  static async searchProduct(request, response) {
    const {
      query_string: queryString, all_words: allWords, page, limit, description_length: descriptionLength
    } = request.query;
    const query = {
      where: (allWords === 'on') ? {
        [Op.or]: [{
          name: { [Op.like]: `%${queryString}%` },
        }, {
          description: { [Op.like]: `%${queryString}%` },
        }]
      } : { name: { [Op.like]: `%${queryString}%` } },
      attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail']
    };
    try {
      const products = await Product.findAll(query);
      let rows = [];
      if (!products) {
        return response.status(404).json({
          message: 'Product not found',
          field: 'product id'
        });
      }
      rows = PaginationHelper.paginateResource(products, page, limit);
      if (descriptionLength) {
        rows = PaginationHelper.stripRowByDescription(rows, descriptionLength);
      }
      const count = products.length;
      return response.status(200).json({ count, rows });
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method fetch products by their department
   *@param {object} requestObj
   *@returns {object} -products and product count
   * @static
   * @memberof ProductService
   */
  static async fetchProductsByDepartment(requestObj) {
    const {
      limit, page, descriptionLength, departmentId
    } = requestObj;
    try {
      const department = await Department.findOne({
        where: { department_id: departmentId },
        include: [{
          model: Category,
          attributes: [
            'category_id'
          ],
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
        }]
      });
      if (!department) {
        return null;
      }
      let rows = [];
      const productRow = [];
      const deptCategories = department.Categories;
      deptCategories.forEach((value) => {
        productRow.push(...value.Products);
        return productRow;
      });
      rows = PaginationHelper.paginateResource(productRow, page, limit);
      if (descriptionLength) {
        rows = PaginationHelper.stripRowByDescription(rows, descriptionLength);
      }
      const count = productRow.length;
      return { count, rows };
    } catch (error) {
      return error;
    }
  }
}
export default ProductService;
