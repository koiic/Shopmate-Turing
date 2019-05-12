/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

// import Sequelize from 'sequelize';
import Model from '../db/models';


const { OrderDetail } = Model;

/**
 * @class OrderService
 */
class OrderDetailService {
  /**
   *@description - this method create new orderDetail
   *@param {object} requestObject
   *@returns {object} - order
   * @static
   * @memberof OrderDetailService
   */
  static async createNewOrderDetail(requestObject) {
    const {
      productId, quantity, attributes, productName, unitCost, orderId
    } = requestObject;
    try {
      const orderDetail = await OrderDetail.create({
        order_id: orderId,
        product_id: productId,
        quantity,
        attributes,
        product_name: productName,
        unit_cost: unitCost,
      });
      if (orderDetail) {
        return orderDetail;
      }
    } catch (error) {
      return error;
    }
  }
}
export default OrderDetailService;
