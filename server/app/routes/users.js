const express = require('express');
const userCtrl = require('../controllers/usersController');
const router = express.Router();


router.route('/').post(userCtrl.create);

router.route('/:id').put(userCtrl.update);

    /** DELETE /api/users/:userId - Delete user */
    // .delete(userCtrl.destroy);

module.exports = router;