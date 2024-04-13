const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");


const Equipment = sequelize.define('Equipement', {
    equipmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },

},{timestamps:false});

Equipment.associate = function (models) {
    Equipment.hasMany(models.Event, { foreignKey: 'equipmentId'});
};

module.exports = Equipment;
