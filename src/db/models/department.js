
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING(1000),
      defaultValue: null
    }
  }, { freezeTableName: true, tableName: 'department', timestamps: false });
  Department.associate = (models) => {
    // associations can be defined here
    Department.hasMany(models.Category, {
      foreignKey: 'department_id',
      targetKey: 'department_id',
      onDelete: 'CASCADE'
    });
  };
  return Department;
};
