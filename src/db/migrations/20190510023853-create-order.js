module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    total_amount: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    created_on: {
      allowNull: false,
      type: Sequelize.DATE
    },
    shipped_on: {
      allowNull: false,
      type: Sequelize.DATE
    },
    status: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    comments: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    auth_code: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    reference: {
      allowNull: true,
      type: Sequelize.STRING(50),
    }
  }),
  down: queryInterface => queryInterface.dropTable('orders')
};
