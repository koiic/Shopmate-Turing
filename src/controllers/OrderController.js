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

  // /**
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} data
  //  * @memberof ProductController
  //  */
  // static async viewSingleProduct(req, res) {
  //   try {
  //     const product = await ProductService.fetchSingleProduct(req, res);
  //     return res.status(200).json(product);
  //   } catch (error) {
  //     return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
  //   }
  // }

  // /**
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} data
  //  * @memberof ProductController
  //  */
  // static async viewProductByCategory(req, res) {
  //   try {
  //     const products = await ProductService.fetchProductsByCategory(req, res);
  //     return products;
  //   } catch (error) {
  //     return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
  //   }
  // }

  // /**
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} data
  //  * @memberof ProductController
  //  */
  // static async searchProduct(req, res) {
  //   try {
  //     const products = await ProductService.searchProduct(req, res);
  //     return products;
  //   } catch (error) {
  //     return res.status(500).json(Message.internalServerError(error));
  //   }
  // }

  // /**
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} data
  //  * @memberof ProductController
  //  */
  // static async viewProductByDepartment(req, res) {
  //   try {
  //     const products = await ProductService.fetchProductsByDepartment(req, res);
  //     return products;
  //   } catch (error) {
  //     return res.status(500).json(Message.internalServerError(error.parent.sqlMessage));
  //   }
  // }
}

export default OrderController;
