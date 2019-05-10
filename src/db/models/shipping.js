module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    shipping_type: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    shipping_cost: {
      allowNull: false,
      type: DataTypes.NUMERIC(10, 2)
    }
  }, { freezeTableName: true, tableName: 'shipping', timestamps: false });
  Shipping.associate = (models) => {
    // associations can be defined here
    Shipping.belongsTo(models.ShippingRegion, {
      foreignKey: 'shipping_region_id',
      targetKey: 'shipping_region_id',
      onDelete: 'CASCADE'
    });
  };
  return Shipping;
};
