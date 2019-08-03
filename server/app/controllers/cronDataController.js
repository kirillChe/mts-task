const R = require('ramda');

//internal modules
const {CronData} = require('../models');

const update = async (req, res) => {

    try {
        let cronData = await CronData.findOne();

        if (!cronData)
            return res.status(502).send({
                message: 'Cannot find any cron data',
                meta: {}
            });

        await cronData.update(req.body);
        res.sendStatus(204);
    } catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while configuring cron data',
            meta: {
                error: e.message
            }
        });
    }
};

const find = async (req, res) => {

    try {
        let cron = await CronData.findOne();

        if (!cron)
            return res.status(404).send({
                message: 'WTF???',
                meta: {}
            });

        let result = R.pickAll(['numberValue', 'periodValue'], cron);
        res.status(200).json(result);
    } catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while configuring cron data',
            meta: {
                error: e.message
            }
        });
    }
};

module.exports = {
    update,
    find
};
