module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    total_amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    created_on: {
      allowNull: false,
      type: DataTypes.DATE
    },
    shipped_on: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comments: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    auth_code: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    reference: {
      allowNull: true,
      type: DataTypes.STRING(50),
    }
  }, { freezeTableName: true, tableName: 'orders', timestamps: false });
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      targetKey: 'customer_id',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Shipping, {
      foreignKey: 'shipping_id',
      targetKey: 'shipping_id',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Tax, {
      foreignKey: 'tax_id',
      targetKey: 'tax_id',
      onDelete: 'CASCADE'
    });
  };
  return Order;
};
