/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import TaxService from '../services/taxService';


/**
 * get all taxes
 * @class TaxController
 */
class TaxController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof TaxController
   */
  static async getAllTax(req, res) {
    try {
      const taxArray = await TaxService.fetchAllTax();
      return res.status(200).json(taxArray);
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
  static async fetchSingleTax(req, res) {
    const { tax_id: taxId } = req.params;
    console.log('tax', taxId);
    if (isNaN(taxId)) {
      return res.status(400).json({
        message: 'Invalid tax id',
        field: 'tax id'
      });
    }
    try {
      const taxObject = await TaxService.getSingleTax(taxId);
      return res.status(200).json(taxObject);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default TaxController;
