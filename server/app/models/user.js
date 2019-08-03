'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        position: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        avatar: {
            type: DataTypes.TEXT
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING(20)
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        birthDate: {
            allowNull: false,
            type: DataTypes.DATE
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

    return User;
};