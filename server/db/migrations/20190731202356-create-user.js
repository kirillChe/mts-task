'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11).UNSIGNED
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(30)
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(30)
            },
            userType: {
                allowNull: false,
                type: Sequelize.STRING(30)
            },
            avatar: {
                type: Sequelize.INTEGER(11).UNSIGNED
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(40),
                unique: true
            },
            phone: {
                allowNull: false,
                type: Sequelize.STRING(20)
            },
            birthDate: {
                type: Sequelize.DATE
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

        return queryInterface.addIndex(
            'Users',
            ['email'],
            {
                indexName: 'uniqUser',
                unique: true
            }
        );
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Users');
    }
};