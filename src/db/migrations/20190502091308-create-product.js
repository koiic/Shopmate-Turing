
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('product', {
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    discounted_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: Sequelize.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    image_2: {
      type: Sequelize.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    thumbnail: {
      type: Sequelize.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    display: {
      type: Sequelize.SMALLINT(6),
      allowNull: false,
      defaultValue: 0
    }
  }),
  down: queryInterface => queryInterface.dropTable('product')
};
