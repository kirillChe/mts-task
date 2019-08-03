'use strict';

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert('CronData', [
            {
                id: 1,
                periodValue: 'days',
                numberValue: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: queryInterface => queryInterface.bulkDelete('CronData', null, {})
};
