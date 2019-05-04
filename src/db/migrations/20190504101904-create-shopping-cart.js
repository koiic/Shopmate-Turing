
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shopping_cart', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    cart_id: {
      allowNull: false,
      type: Sequelize.CHAR(32)
    },
    product_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    attributes: {
      allowNull: false,
      type: Sequelize.STRING(1000)
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    buy_now: {
      allowNull: false,
      type: Sequelize.TINYINT,
      defaultValue: 1
    },
    added_on: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('shopping_cart')
};
