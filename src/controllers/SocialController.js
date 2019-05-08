import TokenAuthenticator from '../middlewares/TokenAuthenticator';

/**
 * @class SocialController
 */
class SocialController {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {json} customer object
   * @memberof SocialController
   */
  static signUser(req, res) {
    const { customer_id: customerId, email, name } = req.user;
    const customer = { customerId, email, name };
    const token = TokenAuthenticator.generateToken(customer);
    if (req.user.created) {
      return res.status(201).json({
        customer,
        accessToken: `Bearer ${token}`,
        expires_in: process.env.TOKEN_EXPIRATION
      });
    }
    res.status(200).json({ customer, accessToken: `Bearer ${token}`, expires_in: process.env.TOKEN_EXPIRATION });
  }
}

export default SocialController;
