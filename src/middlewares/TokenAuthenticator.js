import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @class VerifyToken
 */
class Authenticator {
  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns {*} tokenObject
   * @memberof VerifyToken
   */
  static verifyToken(request, response, next) {
    const token = request.headers['user-key'];
    if (!token || token.trim() === '') {
      return response.status(401).json({
        code: 'AUT_02',
        message: 'Access Unauthorized',
        field: 'NoAuth'
      });
    }
    if (token.split(' ')[0] !== 'Bearer') {
      return response.status(401).json({
        code: 'AUT_03',
        message: 'Invalid token supplied',
        field: 'authorization code'
      });
    }
    const verifiedToken = token.split(' ')[1];
    jwt.verify(verifiedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          code: 'AUT_03',
          message: 'Fail to authenticate token',
          field: 'authorization code'
        });
      }
      request.decoded = decoded;
      next();
    });
  }

  /**
   * @static
   * @param {object} customerData
   * @returns {*} tokenObject
   * @memberof VerifyToken
   */
  static generateToken(customerData) {
    const token = jwt.sign({ customerData }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });
    return token;
  }
}

export default Authenticator;
