
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    image_2: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    thumbnail: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null
    },
    display: {
      type: DataTypes.SMALLINT(6),
      allowNull: false,
      defaultValue: 0
    }
  }, { freezeTableName: true, tableName: 'product', timestamps: false });
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsToMany(models.Category, {
      foreignKey: 'product_id',
      through: 'product_category',
    });
  };
  return Product;
};
