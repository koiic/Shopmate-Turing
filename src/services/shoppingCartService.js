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
   *@param {object} request
   *@param {object} response
   *@returns {list} - list of items in cart
   * @static
   * @memberof ShoppingCartService
   */
  static async addProductToCart(request, response) {
    console.log(request.query)
    const { cart_id: cartId, product_id: productId, attributes } = request.query || req.body;
    if (isNaN(productId)) {
      return response.status(400).json({
        message: 'Product id must be a number',
        field: 'product id'
      });
    }
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
          added_on: new Date().toLocaleString(),
          attribute: attributes
        })
      }else {
        await ShoppingCart.create({
          cart_id: cartId,
          product_id: productId,
          quantity: 1,
          added_on: new Date().toLocaleString(),
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
      return response.status(200).json(formattedItem);
    }
    return response.status(404).json({
      message: 'Product not found',
      field: 'product id'
    });
  }
catch (error) {
  return respone.status(500).json({ error: error.parent.sqlMessage})
}
  }
}

export default ShoppingCartService;
