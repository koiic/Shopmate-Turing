
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    department_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING(1000),
      defaultValue: null
    }
  }, { freezeTableName: true, tableName: 'category', timestamps: false });
  Category.associate = (models) => {
    // associations can be defined here
    Category.belongsToMany(models.Product, {
      foreignKey: 'category_id',
      through: 'product_category',
    });
    Category.belongsTo(models.Department, {
      foreignKey: 'department_id',
      targetKey: 'department_id',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
