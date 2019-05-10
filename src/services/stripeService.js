import stripe from 'stripe';
import { config } from 'dotenv';

config();

const keySecret = process.env.STRIPE_SECRET_KEY;
const Stripe = stripe(keySecret);

/**
 * @class StripeService
 */
class StripeService {
  /**
   * @static
   * @param {*} requestObj
   * @returns {*} customer and charge object
   * @memberof StripeService
   */
  static async payWithStripe(requestObj) {
    const {
      orderId, description, amount, currency, stripeToken, email
    } = requestObj;
    try {
      const customer = await Stripe.customers.create({
        email,
        source: stripeToken
      });
      const charge = await Stripe.charges.create({
        amount, description, currency, customer: customer.id, metadata: { order_id: orderId }
      });
      return charge;
    } catch (error) {
      return error;
    }
  }

  /**
   * @static
   * @param {*} requestObj
   * @returns {*} stripeToken Object
   * @memberof StripeService
   */
  static async generateStripeToken(requestObj) {
    const {
      number, expMonth, expYear, cvc
    } = requestObj;
    try {
      const stripeToken = await Stripe.tokens.create({
        card: {
          number, exp_month: expMonth, exp_year: expYear, cvc
        }
      });
      return stripeToken.id;
    } catch (error) {
      return error;
    }
  }
}
export default StripeService;
