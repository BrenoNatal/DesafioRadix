const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Event = sequelize.define('Event', {
    timestamp: {
        type: DataTypes.DATE,
    },
    value: {
        type: DataTypes.FLOAT,
    },
    

},{timestamps:false});

Event.associate = function (models) {
    Event.belongsTo(models.Equipement, { foreignKey: 'equipmentId' });
};


module.exports = Event;
