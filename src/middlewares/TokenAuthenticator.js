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
    console.log(' I am Here .....');
    const token = request.headers['user-key'];
    if (!token || token.trim() === '') {
      return response.status(403).json({
        code: 'AUT_01',
        message: ' Authorization code is empty',
        field: 'authorization code'
      });
    }
    if (token.split(' ')[0] !== 'Bearer') {
      return response.status(403).json({
        code: 'AUT_03',
        message: 'Invalid token supplied',
        field: 'authorization code'
      });
    }
    console.log(' I am second if .....');

    const verifiedToken = token.split(' ')[1];
    jwt.verify(verifiedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(' I am third if .....');
        return response.status(401).json({
          code: 'AUT_03',
          message: 'Fail to authenticate token',
          field: 'authorization code'
        });
      }
      request.decoded = decoded;
      console.log(request.decoded);
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
