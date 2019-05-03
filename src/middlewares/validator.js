
/**
 * @class Validator
 */
class Validator {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} object
   * @memberof Validator
   */
  static validateProductId(req, res, next) {
    const { product_id: productId } = req.params;
    const error = {};
    if (!parseInt(productId)) {
      error.status = 400;
      error.message = 'Product id must be a number';
      error.field = 'product id';
    }

    if (error) {
      return res.status(400).json(error);
    }
    return next();
  }
}
export default Validator;
