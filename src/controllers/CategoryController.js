/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import CategoryService from '../services/categoryService';


/**
 * get all taxes
 * @class DepartmentController
 */
class CategoryController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof CategoryController
   */
  static async fetchAllCategories(req, res) {
    try {
      const categoryArray = await CategoryService.getAllCategories(req);
      return res.status(200).json(categoryArray);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof CategoryController
   */
  static async fetchSingleCategory(req, res) {
    const { category_id: categoryId } = req.params;
    if (isNaN(categoryId)) {
      return res.status(400).json({
        message: 'Invalid category id',
        field: 'category id'
      });
    }
    try {
      const categoryObject = await CategoryService.getSingleCategory(categoryId);
      if (!categoryObject) {
        return res.status(400).json({
          error: {
            status: 400,
            message: 'Don\'exist category with this ID.',
            code: 'CAT_02',
            field: 'category id'
          }
        });
      }
      return res.status(200).json(categoryObject);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default CategoryController;
