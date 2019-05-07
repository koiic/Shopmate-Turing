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
   * @param {*} req request payload from client
   * @param {*} res server response
   * @returns {object} userObject
   * @memberof CustomerController
   */
  static async authenticateCustomer(req, res) {
    try {
      const customer = await CustomerService.loginCustomer(req, res);
      return customer;
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * @static
   * @param {*} req request payload from client
   * @param {*} res server response
   * @returns {object} updated customer object
   * @memberof CustomerController
   */
  static async updateCustomerInfo(req, res) {
    try {
      const updatedCustomerInfo = await CustomerService.updateCustomer(req, res);
      return updatedCustomerInfo;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default CustomerController;
