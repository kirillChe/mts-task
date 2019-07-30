const express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser')
    // , cookieParser = require('cookie-parser')
    // , cors = require('cors')
    , morgan = require('morgan');


//Models
const models = require('./app/models');
//Middleware
const middleware = require(__dirname + '/middleware');
// set the port
const port = parseInt(process.env.PORT, 10) || 5000;
// Set up the express app
const app = express();


const serverApp = async () => {
    //TODO Don't leave it as is
    // app.use(cors({
    //     // origin: '',
    //     credentials: true,
    //     methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    // }));

    //HTTP request logger
    app.use(morgan('dev'));

    // app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(middleware.publicHandler());

    try {
        await models.sequelize.sync();
        console.log('Nice! Database looks fine');
    } catch (e) {
        console.log('Something went wrong with the Database update! ', e);
    }

    //Require routes into the application
    require('./app/routes')(app);

    app.use(middleware.errorHandler());

    // server instance
    const server = http.createServer(app);

    // start the app
    server.listen(port, () => console.log(`Server is running on port 3101`));

    return server;
};


module.exports = serverApp();
