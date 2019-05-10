module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shipping', {
    shipping_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    shipping_type: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    shipping_cost: {
      allowNull: false,
      type: Sequelize.NUMERIC(10, 2)
    }
  }),
  down: queryInterface => queryInterface.dropTable('shipping')
};
