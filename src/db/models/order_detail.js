module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    attributes: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    product_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    unit_cost: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
  }, { freezeTableName: true, tableName: 'order_detail', timestamps: false });
  OrderDetail.associate = (models) => {
    // associations can be defined here
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'order_id',
      targetKey: 'order_id',
      onDelete: 'CASCADE'
    });
  };
  return OrderDetail;
};
