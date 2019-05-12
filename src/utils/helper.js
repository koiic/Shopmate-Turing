import bcrypt from 'bcrypt';
import asyncRedis from 'async-redis';
import { config } from 'dotenv';

config();

let redisClient;
if (process.env.NODE_ENV === 'development') {
  redisClient = asyncRedis.createClient(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
} else {
  redisClient = asyncRedis.createClient(process.env.REDIS_URL);
}


export default {

  async hash(password) {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    return hashedPassword;
  },

  async compare(password, customerPassword) {
    const compared = await bcrypt.compareSync(password.trim(), customerPassword);
    return compared;
  },

  formatCartItems(cartItem) {
    const { item_id: itemId, quantity, attributes } = cartItem.dataValues;
    const {
      price, name, discounted_price: discountedPrice,
      product_id: productId, image
    } = cartItem.dataValues.Product;

    return {
      item_id: itemId,
      name,
      attributes,
      product_id: productId,
      price,
      quantity,
      image,
      subtotal: ((price * quantity) - (discountedPrice * quantity)).toFixed(2).toString()
    };
  },

  async redisCache(cacheKey, cacheObject) {
    const result = await redisClient.get(cacheKey);
    if (result) {
      return JSON.parse(result);
    }
    await redisClient.set(cacheKey, JSON.stringify(cacheObject), 'EX', process.env.REDIS_TIMEOUT,);
  }
};
