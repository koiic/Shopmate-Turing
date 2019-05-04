
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('customer', {
    customer_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    credit_card: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    address_1: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    address_2: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    region: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    postal_code: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    shipping_region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    eve_phone: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    mob_phone: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null
    }
  }),
  down: queryInterface => queryInterface.dropTable('customer')
};
