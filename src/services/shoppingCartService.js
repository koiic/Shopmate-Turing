import Model from '../db/models';

import helper from '../utils/helper';

const { Product, ShoppingCart } = Model;

const { formatCartItems } = helper;

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

  /**
   *@description - this method add product to cart
   *@param {object} requestObject
   *@returns {list} - list of items in cart
   * @static
   * @memberof ShoppingCartService
   */
  static async addProductToCart(requestObject) {
    const { cartId, productId, attributes } = requestObject;
    try {
      const product = await Product.findOne({
        where: {
          product_id: productId
        }
      });
      if (product) {
        const availableCart = await ShoppingCart.findOne({
          where: {cart_id: cartId, product_id: productId, attribute: attributes}
        })
        if(availableCart){
          const quantity = availableCart.quantity + 1;
          await availableCart.update({
            cart_id: cartId,
            product_id: productId,
            quantity,
            added_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
            attribute: attributes
          })
        }else {
          await ShoppingCart.create({
            cart_id: cartId,
            product_id: productId,
            quantity: 1,
            added_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
            attribute: attributes
          })
        }
        const allCartItem = await ShoppingCart.findAll({
          where: { cart_id: cartId },
            attributes: [
              'item_id',
              'attributes',
              'quantity'
            ],
            include: [{
              model: Product,
              attributes: [
                'product_id',
                'name',
                'price',
                'discounted_price',
                'image'
              ]
            }]
        })
        let formattedItem = [];
        formattedItem = allCartItem.map((cartItem, i) => formatCartItems(cartItem));
        return formattedItem;
      }
      return null
    }
    catch (error) {
      return error
    }
  }

  /**
   *@description - this method fetch products by cart id
   *@param {object} request
   *@param {object} response
   *@returns {list} - list of items in cart
   * @static
   * @memberof ShoppingCartService
   */
  static async fetchCartsProduct(cartId) {
    try {
        const allCartItem = await ShoppingCart.findAll({
          where: { cart_id: cartId },
            attributes: [
              'item_id',
              'attributes',
              'quantity'
            ],
            include: [{
              model: Product,
              attributes: [
                'product_id',
                'name',
                'price',
                'discounted_price',
                'image'
              ]
            }]
        })
        let formattedItem = [];
        formattedItem = allCartItem.map((cartItem, i) => formatCartItems(cartItem));
        return formattedItem
    }
    catch (error) {
      return error;
    }
  }

    /**
   *@description - this method empty the shopping cart
   *@param {object} request
   *@param {object} response
   *@returns {list} - empty list
   * @static
   * @memberof ShoppingCartService
   */
  static async emptyCart(request, response) {
    const { cart_id: cartId } = request.params;
    try {
      await ShoppingCart.destroy({
        where: { cart_id: cartId}
      });
      return response.status(200).json([]);
    }
    catch (error) {
      return respone.status(500).json({ error: error.parent.sqlMessage})
    }
  }
}

export default ShoppingCartService;
