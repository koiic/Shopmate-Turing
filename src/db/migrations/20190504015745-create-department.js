
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('department', {
    department_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      defaultValue: null
    }
  }),
  down: queryInterface => queryInterface.dropTable('department')
};
