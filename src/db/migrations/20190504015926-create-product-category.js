
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('product_category', {
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    }
  }),
  down: queryInterface => queryInterface.dropTable('product_category')
};
