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
    const { cart_id: cartId } = req.params || req.body;
    try {
      const cartItems = await ShoppingCartService.fetchCartsProduct(cartId);
      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({ error: error.parent.sqlMessage });
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {list} data
   * @memberof ProductController
   */
  static async emptyShoppingCart(req, res) {
    try {
      const emptiedCart = await ShoppingCartService.emptyCart(req, res);
      return emptiedCart;
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default ShoppingCartController;
