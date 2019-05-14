/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

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
    const { cart_id: cartId, product_id: productId, attributes } = req.query || req.body;
    if (isNaN(productId)) {
      return res.status(400).json({
        message: 'Product id must be a number',
        field: 'product id'
      });
    }
    const requestObj = { cartId, productId, attributes };
    try {
      const cartItems = await ShoppingCartService.addProductToCart(requestObj);
      if (!cartItems) {
        return res.status(404).json({
          message: 'Product not found',
          field: 'product id'
        });
      }
      return res.status(200).json(cartItems);
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
