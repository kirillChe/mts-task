const usersRoutes = require('./users');
const filesRoutes = require('./files');


module.exports = app => {

    app.use('/api/users', usersRoutes);
    app.use('/api/files', filesRoutes);
};