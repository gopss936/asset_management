
module.exports = (sequelize, Sequelize) => {
    const AssetCategory = sequelize.define("asset_categories", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      }
    });
  
    return AssetCategory;
  };
  