'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CronData', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11).UNSIGNED
            },
            periodValue: {
                allowNull: false,
                type: Sequelize.ENUM('days', 'hours'),
                defaultValue: 'hours'
            },
            numberValue: {
                allowNull: false,
                type: Sequelize.INTEGER(9)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });

        return queryInterface;
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('CronData');
    }
};