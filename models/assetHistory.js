module.exports = (sequelize, Sequelize) => {
    const AssetHistory = sequelize.define('asset_history', { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assetSerialNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        employeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        issuedDate: {
            type: Sequelize.DATE,
        },
        returnDate: {
            type: Sequelize.DATE
        },
        returnReason: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'asset_histories' 
    });

    AssetHistory.associate = (models) => {
        AssetHistory.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'employee' });
        AssetHistory.belongsTo(models.Asset, { foreignKey: 'assetSerialNumber', as: 'asset' });
    };

    return AssetHistory;
};
