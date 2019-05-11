module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('order_detail', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    product_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    attributes: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    product_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    unit_cost: {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    },
  }),
  down: queryInterface => queryInterface.dropTable('order_detail')
};
