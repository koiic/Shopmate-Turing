/**
 * @class ShoppingCartService
 */
class ShoppingCartService {
  /**
   *
   *
   * @static
   * @param {*} range
   * @returns {string} unique string
   * @memberof ShoppingCartService
   */
  static generateUniqueId() {
    const range = 11;
    /* eslint-disable */
    const uniqueString = Array(range).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
    return uniqueString;
  }
}

export default ShoppingCartService;
