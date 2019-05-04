
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.STRING(32)
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    attribute: {
      allowNull: false,
      type: DataTypes.STRING(1000),
      field: 'attributes'
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    buy_now: {
      allowNull: false,
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    added_on: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, { freezeTableName: true, tableName: 'shopping_cart', timestamps: false });
  ShoppingCart.associate = (models) => {
    // associations can be defined here
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'product_id',
      onDelete: 'CASCADE'
    });
  };
  return ShoppingCart;
};
