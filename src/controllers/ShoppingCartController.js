import ShoppingCartService from '../services/shoppingCartService';

/**
 * @class ShoppingCartController
 */
class ShoppingCartController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} userObject
   * @memberof CustomerController
   */
  static generateCartId(req, res) {
    try {
      const uniqueCartId = ShoppingCartService.generateUniqueId();
      return res.status(200).json({ cart_id: uniqueCartId });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }


  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {list} data
   * @memberof ProductController
   */
  static async addToCart(req, res) {
    try {
      const cartItems = await ShoppingCartService.addProductToCart(req, res);
      return cartItems;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {list} data
   * @memberof ProductController
   */
  static async viewCartsProduct(req, res) {
    try {
      const cartItems = await ShoppingCartService.fetchCartsProduct(req, res);
      return cartItems;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default ShoppingCartController;
