import Model from '../db/models';
import helpers from '../utils/helper';
import TokenAuthenticator from '../middlewares/TokenAuthenticator';

const { Customer } = Model;
const { hash, compare } = helpers;
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
      if (!checkCustomer) {
        const hashedPassword = await hash(password);
        const registeredCustomer = await Customer.create({
          name, email, password: hashedPassword
        });
        // registeredCustomer.reload();
        if (registeredCustomer) {
          console.log('--------', registeredCustomer);
          const token = TokenAuthenticator.generateToken({
            name: registeredCustomer.dataValues.name,
            id: registeredCustomer.dataValues.customer_id,
            email: registeredCustomer.dataValues.email
          });
          delete registeredCustomer.dataValues.password;
          return response.status(201).json({
            customer: registeredCustomer,
            accessToken: `Bearer ${token}`,
            expires_in: process.env.TOKEN_EXPIRATION
          });
        }
        return response.status(400).json({
          code: 'USR_01',
          message: 'Email or Password is invalid.',
          field: 'password'
        });
      }
      return response.status(409).json({
        code: 'USR_03',
        message: 'email already exist',
        field: 'email'
      });
    } catch (error) {
      return response.status(500).json({
        code: 'USR_05',
        message: error.parent.sqlMessage
      });
    }
  }

  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @returns {object} userData
   * @memberof CustomerService
   */
  static async loginCustomer(request, response) {
    const { email, password } = request.body;
    try {
      const checkCustomer = await Customer.findOne({
        where: { email }
      });
      if (checkCustomer) {
        const validatePassword = await compare(password, checkCustomer.password);
        if (validatePassword) {
          const token = TokenAuthenticator.generateToken({
            name: checkCustomer.dataValues.name,
            id: checkCustomer.dataValues.customer_id,
            email: checkCustomer.dataValues.email
          });
          // console.log('==== success');
          return response.status(200).json({
            customer: checkCustomer,
            accessToken: `Bearer ${token}`,
            expires_in: process.env.TOKEN_EXPIRATION
          });
        }
        return response.status(400).json({
          code: 'USR_01',
          message: 'Email or Password is invalid.',
          field: 'password'
        });
      }
      return response.status(400).json({
        code: 'USR_01',
        message: 'Email or Password is invalid.',
        field: 'password'
      });
    } catch (error) {
      return response.status(500).json({
        code: 'USR_05',
        message: error
      });
    }
  }

  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @returns {object} updated customer info
   * @memberof CustomerService
   */
  static async updateCustomer(request, response) {
    const { email } = request.decoded.customerData;
    try {
      const findCustomer = await Customer.findOne({
        where: { email }
      });
      if (findCustomer) {
        const updatedCustomer = await findCustomer.update(request.body);
        delete updatedCustomer.dataValues.password;
        return response.status(200).json(updatedCustomer);
      }
      return response.status(404).json({
        code: 'USR_04',
        message: 'Customer does not exist',
        field: ''
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
