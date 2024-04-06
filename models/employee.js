module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.AssetHistory, { foreignKey: 'employeeId', as: 'issuedHistories' });
};


  return Employee;
};