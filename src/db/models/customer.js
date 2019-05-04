
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    credit_card: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    address_2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    postal_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    eve_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    mob_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    }
  }, { freezeTableName: true, tableName: 'customer', timestamps: false });
  Customer.associate = (models) => {
    // associations can be defined here
    Customer.belongsTo(models.ShippingRegion, {
      foreignKey: 'shipping_region_id',
      targetKey: 'shipping_region_id',
      onDelete: 'CASCADE'
    });
  };
  return Customer;
};
