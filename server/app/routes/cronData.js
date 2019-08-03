const express = require('express');
const cronCtrl = require('../controllers/cronDataController');
const router = express.Router();


router.route('/').put(cronCtrl.update)
    .get(cronCtrl.find);

module.exports = router;