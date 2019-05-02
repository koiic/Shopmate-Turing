/**
 * @class Message
 */
class Message {
  /**
   * @static
   * @param {string} message
   * @param {object} data
   * @returns {object} object
   * @memberof Message
   */
  static createdSuccessfully(message, data = null) {
    return {
      responseMessage: message,
      status: 201,
      data,
    };
  }

  /**
   * @static
   * @param {string} message
   * @returns {object} object
   * @memberof Message
   */
  static unauthenticated(message) {
    return {
      responseMessage: message,
      status: 401,
    };
  }

  /**
   * @static
   * @param {string} message
   * @returns {object} object
   * @memberof Message
   */
  static badRequest(message) {
    return {
      responseMessage: message,
      status: 400,
    };
  }

  /**
   * @static
   * @param {string} message
   * @returns {object} object
   * @memberof Message
   */
  static unauthorized(message) {
    return {
      responseMessage: message,
      status: 403,
    };
  }

  /**
   * @static
   * @param {string} message
   * @returns {object} object
   * @memberof Message
   */
  static notFound(message) {
    return {
      responseMessage: message,
      status: 404,
    };
  }

  /**
   * @static
   * @param {string} message
   * @returns {object} object
   * @memberof Message
   */
  static internalServerError(message) {
    return {
      responseMessage: message,
      status: 500,
    };
  }

  /**
   * @static
   * @param {string} message
   * @param {object} data
   * @returns {object} object
   * @memberof Message
   */
  static success(message, data = null) {
    return {
      responseMessage: message,
      status: 200,
      data,
    };
  }

  /**
   * @static
   * @param {string} message
   * @param {object} data
   * @returns {object} object
   * @memberof Message
   */
  static conflictError(message) {
    return {
      responseMessage: message,
      status: 409,
    };
  }

  /**
   * @static
   * @returns {object} object
   * @memberof Message
   */
  static checkArgs(...params) {
    if (params.length < 2 || params.length > 4) {
      return this.badRequest('Please insert or pass the right arguments');
    }
    return null;
  }
}

export default Message;
