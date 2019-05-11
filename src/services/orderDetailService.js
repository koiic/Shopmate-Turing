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
    console.log('i got hereeeeeeeee');
    const {
      productId, quantity, attributes, productName, unitCost, orderId
    } = requestObject;
    console.log('----', requestObject);
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
      console.log('-------', error);
      return error;
    }
  }

  // /**
  //  *@description - this method return a single order object
  //  *@param {int} orderId
  //  *@returns {object} - orderObject
  //  * @static
  //  * @memberof OrderService
  //  */
  // static async getSingleOrderDetails(orderId) {
  //   try {
  //     const order = await Order.findOne({
  //       where: { order_id: orderId }
  //     });
  //     if (order) {
  //       console.log('pppppp', order);
  //       return order;
  //     }
  //     return null;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
export default OrderDetailService;
