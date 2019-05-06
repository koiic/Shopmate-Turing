import CustomerService from '../services/customerService';

/**
 * @class CustomerController
 */
class CustomerController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} userObject
   * @memberof CustomerController
   */
  static async registerCustomer(req, res) {
    try {
      const customer = await CustomerService.createAccount(req, res);
      return customer;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} userObject
   * @memberof CustomerController
   */
  static async authenticateCustomer(req, res) {
    try {
      const customer = await CustomerService.loginCustomer(req, res);
      return customer;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default CustomerController;
