
/**
 * @class AuthMiddleware
 */
class AuthMiddleWare {
  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns {object} object
   * @memberof AuthMiddleWare
   */
  static validateSignUpRequest(request, response, next) {
    const errors = [];
    const {
      name, password, email,
    } = request.body;
    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
    if (!email || email.trim() === '') errors.push('Email is required');
    if (email && !emailPattern.test(email.trim())) errors.push('Email is invalid');
    if (email && email.length > 30) errors.push('email character is too long');
    if (email && typeof email !== 'string') errors.push('email must be a string');
    if (!password || password.trim() === '') errors.push('Password field is required');
    if (password && password.length < 4) errors.push('Password must be atleast 4 characters');
    if (password && typeof password !== 'string') errors.push('password must be a string');
    if (!name || name.trim() === '') errors.push('Name is required');
    if (name && name.trim() > 50) errors.push('Name character should not longer than 50');
    if (name && typeof name !== 'string') errors.push('Name value must be a string');
    // }
    if (errors.length) {
      return response.status(400).json({
        status: 400,
        code: 'USR_04',
        message: errors
      });
    }
    next();
  }

  /**
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns {object} object
   * @memberof AuthMiddleWare
   */
  static validateLoginRequest(request, response, next) {
    const errors = [];
    const {
      email, password,
    } = request.body;
    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
    if (!email || email.trim() === '') errors.push('Email is required');
    if (email && !emailPattern.test(email.trim())) errors.push('Email is invalid');
    if (email && email.length > 30) errors.push('email character is too long');
    if (email && typeof email !== 'string') errors.push('email must be a string');
    if (!password || password.trim() === '') errors.push('Password is required');
    if (password && password.length < 4) errors.push('Password must be atleast 4 characters');
    if (password && typeof password !== 'string') errors.push('password must be a string');

    if (errors.length) {
      return response.status(400).json({
        status: 400,
        code: 'USR_04',
        message: errors
      });
    }
    next();
  }
}

export default AuthMiddleWare;
