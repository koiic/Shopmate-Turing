module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tax', {
    tax_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    tax_type: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    tax_percentage: {
      allowNull: false,
      type: Sequelize.NUMERIC(10, 2)
    },
  }),
  down: queryInterface => queryInterface.dropTable('tax')
};
