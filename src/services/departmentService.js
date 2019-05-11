/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

// import Sequelize from 'sequelize';
import Model from '../db/models';


const { Department } = Model;

/**
 * @class DepartmentService
 */
class DepartmentService {
  /**
   *@description - this method fetch all departments
   *@param {object} requestObject
   *@returns {ArrayObject} - departmentArray
   * @static
   * @memberof DepartmentService
   */
  static async getAllDepartment() {
    try {
      const departments = await Department.findAll();
      if (departments) {
        return departments;
      }
      return [];
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method return a single department object
   *@param {int} departmentId
   *@returns {object} - departmentObject
   * @static
   * @memberof DepartmentService
   */
  static async getSingleDepartment(departmentId) {
    try {
      const department = await Department.findOne({
        where: { department_id: departmentId }
      });
      if (department) {
        return department;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
export default DepartmentService;
