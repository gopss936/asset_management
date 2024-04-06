module.exports = (sequelize, Sequelize) => {
  const Asset = sequelize.define("asset", {
    serialNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    make: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('stock', 'non-stock', 'scrapped'),
      allowNull: false,
      defaultValue: 'stock',
    }
  });

  Asset.associate = (models) => {
    Asset.hasMany(models.AssetHistory, { foreignKey: 'assetSerialNumber', as: 'assetHistories' });
  };

  return Asset;
};