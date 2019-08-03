'use strict';

module.exports = (sequelize, DataTypes) => {
    const CronData = sequelize.define('CronData', {
        numberValue: {
            allowNull: false,
            type: DataTypes.INTEGER(9)
        },
        periodValue: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['days', 'hours'],
            defaultValue: 'hours'
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    }, {});

    return CronData;
};