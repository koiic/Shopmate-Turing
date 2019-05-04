
module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    shipping_region_: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, { freezeTableName: true, tableName: 'shipping_region', timestamps: false });
  // ShippingRegion.associate = (models) => {
  //   // associations can be defined here
  // };
  return ShippingRegion;
};
