/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

import Model from '../db/models';
import PaginationHelper from '../utils/paginationHelper';

const { Category } = Model;

/**
 * @class CategoryService
 */
class CategoryService {
  /**
   *@description - this method fetch all categories
   *@param {object} request
   *@param {object} response
   *@returns {object} -categories and categories count
   * @static
   * @memberof CategoryService
   */
  static async getAllCategories(request) {
    const { limit, page } = request.query;
    const queries = {
      limit,
      page
    };
    try {
      const data = await PaginationHelper.paginationHelper(Category, queries);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method fetch single category
   *@param {int} categoryId
   *@param {object} response
   *@returns {object} -category object
   * @static
   * @memberof ProductService
   */
  static async getSingleCategory(categoryId) {
    try {
      const category = await Category.findOne({
        where: {
          category_id: categoryId
        }
      });
      if (category) {
        return category;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
export default CategoryService;
