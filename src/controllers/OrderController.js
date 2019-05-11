/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import OrderService from '../services/orderService';
/**
 * @class OrderController
 */
class OrderController {
  /**
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} data
     * @memberof OrderController
     */
  static async createOrder(req, res) {
    const { cart_id: cartId, shipping_id: shippingId, tax_id: taxId } = req.query || req.body;
    const { id } = req.decoded.customerData;
    const requestObj = {
      cartId, shippingId, taxId, id
    };
    try {
      const order = await OrderService.createNewOrder(requestObj);
      return res.status(200).json({ order_id: order });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof TaxController
   */
  static async getOrderDetails(req, res) {
    const { order_id: orderId } = req.params;
    if (isNaN(orderId)) {
      return res.status(400).json({
        message: 'Invalid order id',
        field: 'order id'
      });
    }
    try {
      const orderObject = await OrderService.getSingleOrderDetails(orderId);
      return res.status(200).json(orderObject);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

export default OrderController;
