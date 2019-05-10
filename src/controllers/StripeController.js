import { config } from 'dotenv';
import mailSender from '../mailer/sendMail';
import template from '../mailer/templates';
import StripeService from '../services/stripeService';


config();

const { confirmationMessageHtml, confirmationMessageText } = template;

/**
 * @class StripeController
 */
class StripeController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} success object
   * @memberof StripeController
   */
  static async stripePayment(req, res) {
    const {
      order_id: orderId, description, amount, currency, stripeToken
    } = req.body;
    const { email, name } = req.decoded.customerData;
    const requestObj = {
      orderId, description, amount, currency, stripeToken, email
    };
    try {
      const charge = await StripeService.payWithStripe(requestObj);
      mailSender({
        from: process.env.MAIL_SENDER,
        to: email,
        subject: 'Confirmation On Your Order',
        text: confirmationMessageText(name, process.env.BASE_URL),
        html: confirmationMessageHtml(name, process.env.BASE_URL)
      });
      return res.status(200).json({ charge, message: 'payment successful' });
    } catch (error) {
      if (error.message.includes('Invalid API Key')) {
        return res.status(401).json({
          code: 'AUT_02',
          message: 'The apikey is invalid.',
          field: 'API-KEY'
        });
      }
      if (error.message.includes('You cannot use a Stripe token more than once')) {
        return res.status(500).json({
          code: 'resource_missing',
          message: `No such token: ${stripeToken}`,
          field: 'source'
        });
      }
      return res.status(500).json({
        code: 'STR_500',
        message: error.message
      });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} successful token object
   * @memberof StripeController
   */
  static async generateStripeToken(req, res) {
    const {
      number, expMonth, expYear, cvc
    } = req.body;
    const requestObj = {
      number, expMonth, expYear, cvc
    };
    try {
      const stripeToken = await StripeService.generateStripeToken(requestObj);
      return res.status(200).json({ stripeToken, message: 'token genearted successfully' });
    } catch (error) {
      if (error.message.includes('Invalid API Key')) {
        return res.status(401).json({
          code: 'AUT_02',
          message: 'The apikey is invalid.',
          field: 'API-KEY'
        });
      }
      return res.status(500).json({
        code: 'STR_500',
        message: error.message
      });
    }
  }
}

export default StripeController;
