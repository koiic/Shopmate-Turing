/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

// import Sequelize from 'sequelize';
import Model from '../db/models';


const { Tax } = Model;

/**
 * @class TaxService
 */
class TaxService {
  /**
   *@description - this method fetch all tax
   *@param {object} requestObject
   *@returns {ArrayBuffer} - taxArray
   * @static
   * @memberof TaxService
   */
  static async fetchAllTax() {
    try {
      const taxes = await Tax.findAll();
      if (taxes) {
        return taxes;
      }
    } catch (error) {
      return error;
    }
  }

  /**
   *@description - this method return a single tax object
   *@param {int} taxId
   *@returns {object} - taxObject
   * @static
   * @memberof TaxService
   */
  static async getSingleTax(taxId) {
    try {
      const tax = await Tax.findOne({
        where: { tax_id: taxId }
      });
      if (tax) {
        return tax;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
export default TaxService;
