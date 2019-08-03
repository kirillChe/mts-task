const express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser')
    , morgan = require('morgan')
    , CronJob = require('cron').CronJob
    , nodemailer = require('nodemailer')
    , mailerConfig = require('./config/config.json').mailer
    , transporter = nodemailer.createTransport(mailerConfig)
    , Op = require('sequelize').Op
    , R = require('ramda')
    , moment = require('moment-timezone');


//Models
const models = require('./app/models');
//Middleware
const middleware = require(__dirname + '/middleware');
// set the port
const port = parseInt(process.env.PORT, 10) || 5000;
// Set up the express app
const app = express();


const serverApp = async () => {
    //HTTP request logger
    app.use(morgan('dev'));

    // app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

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
    // run cron every hour
    new CronJob('0 * * * *', async () => {
        console.log('You will see this message every hour');
        const {CronData, User} = models;
        try {
            let cron = await CronData.findOne();
            let {numberValue, periodValue} = cron;

            let filter = {
                where: {
                    birthDate: {
                        [Op.and]: {
                            [Op.gte]: moment().tz('Europe/Moscow').add(numberValue, periodValue).startOf('hour').format('YYYY-MM-DD HH:mm:ss'),
                            [Op.lte]: moment().tz('Europe/Moscow').add(numberValue, periodValue).endOf('hour').format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                }
            };

            let users = await User.findAll(filter);
            let emails = R.map(R.prop('email'), users);
            await transporter.sendMail({
                from: 'Info <info@mts.it>', // sender address
                to: emails.toString(), // list of receivers
                subject: `Hello, bro!`, // Subject line
                text: 'Happy Birthday!' // plain text body
            })

        } catch (e) {
            console.log('cron error: ', e);
        }
    }, null, true);

    // start the app
    server.listen(port, () => console.log(`Server is running on port 3101`));

    return server;
};


module.exports = serverApp();
