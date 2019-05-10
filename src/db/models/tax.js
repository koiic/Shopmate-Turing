module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    tax_type: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    tax_percentage: {
      allowNull: false,
      type: DataTypes.NUMERIC(10, 2)
    },
  }, { freezeTableName: true, tableName: 'tax', timestamps: false });
  // Tax.associate = (models) => {
  //   // associations can be defined here
  // };
  return Tax;
};
