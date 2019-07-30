const express = require('express')
    , fileCtrl = require('../controllers/filesController')
    , router = express.Router();

/** POST /api/files/upload/:userId - Upload file */
router.route('/upload/:id').post(fileCtrl.upload);

router.route('/:id')

    /** DELETE /api/files/:fileId - Delete user */
    .delete(fileCtrl.destroy);

module.exports = router;