/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

// import Sequelize from 'sequelize';
import Model from '../db/models';
import ShoppingCartService from './shoppingCartService';
// const { Op } = Sequelize;


const { Order } = Model;

/**
 * @class OrderService
 */
class OrderService {
  /**
   *@description - this method create new order
   *@param {object} requestObject
   *@returns {object} - order
   * @static
   * @memberof OrderService
   */
  static async createNewOrder(requestObject) {
    const {
      cartId, shippingId, taxId, id
    } = requestObject;
    try {
      const cartItems = await ShoppingCartService.fetchCartsProduct(cartId);
      if (cartItems) {
        const totalAmount = cartItems.map(item => item.subtotal).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        const newOrder = await Order.create({
          total_amount: totalAmount.toFixed(2),
          created_on: new Date().toLocaleString(),
          shipped_on: new Date().toLocaleString(),
          customer_id: id,
          status: 1,
          shipping_id: shippingId,
          tax_id: taxId
        });
        if (newOrder) {
          return newOrder.order_id;
        }
      }
    } catch (error) {
      return error;
    }
  }
}
export default OrderService;
