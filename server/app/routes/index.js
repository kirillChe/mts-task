const usersRoutes = require('./users');
const cronsRoutes = require('./cronData');


module.exports = app => {

    app.use('/api/users', usersRoutes);
    app.use('/api/crons', cronsRoutes);
};