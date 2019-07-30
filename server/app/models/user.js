'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        },
        userType: {
            type: DataTypes.STRING(30)
        },
        avatar: {
            type: DataTypes.INTEGER(11)
        },
        phone: {
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
    }, {
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    User.associate = models => {
        User.hasMany(models.File, {foreignKey: 'userId', as: 'files', onDelete: 'cascade', hooks: true });
    };

    return User;
};