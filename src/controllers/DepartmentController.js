/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import DepartmentService from '../services/departmentService';


/**
 * get all taxes
 * @class DepartmentController
 */
class DepartmentController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof DepartmentController
   */
  static async fetchAllDepartment(req, res) {
    try {
      const departmentArray = await DepartmentService.getAllDepartment();
      return res.status(200).json(departmentArray);
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
   * @memberof TaxController
   */
  static async fetchSingleDepartment(req, res) {
    const { department_id: departmentId } = req.params;
    if (isNaN(departmentId)) {
      return res.status(400).json({
        message: 'Invalid department id',
        field: 'department id'
      });
    }
    try {
      const taxObject = await DepartmentService.getSingleDepartment(departmentId);
      if (!taxObject) {
        return res.status(400).json({
          error: {
            status: 400,
            message: 'Don\'exist department with this ID.',
            code: 'DEP_02',
            field: 'department_id'
          }
        });
      }
      return res.status(200).json(taxObject);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default DepartmentController;
