import bcrypt from 'bcrypt';

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
  }
};
