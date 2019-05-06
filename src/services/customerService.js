import Model from '../db/models';
import helpers from '../utils/helper';
import TokenAuthenticator from '../middlewares/TokenAuthenticator';

const { Customer } = Model;
const { hash } = helpers;
/**
 * @class CustomerService
 */
class CustomerService {
  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @returns {object} userData
   * @memberof CustomerService
   */
  static async createAccount(request, response) {
    const { email, password, name } = request.body;
    try {
      const checkCustomer = await Customer.findOne({
        where: { email }
      });
      if (checkCustomer) {
        return response.status(409).json({
          code: 'USR_03',
          message: 'email already exist',
          field: 'email'
        });
      }
      const hashedPassword = await hash(password);
      const registeredCustomer = await Customer.create({
        name, email, password: hashedPassword
      });
      registeredCustomer.reload();
      const token = TokenAuthenticator.generateToken({
        name: registeredCustomer.name,
        id: registeredCustomer.id,
        email: registeredCustomer.email
      });
      return response.status(201).json({
        customer: registeredCustomer,
        accessToken: `Bearer ${token}`,
        expires_in: process.env.TOKEN_EXPIRATION
      });
    } catch (error) {
      return response.status(500).json({
        code: 'USR_05',
        message: error.parent.sqlMessage
      });
    }
  }
}

export default CustomerService;
