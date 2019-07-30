const R = require('ramda')
    , {File, User} = require('../models');


const upload = async (req, res) => {
    //check if user is admin if user id is provided
    if (req.params.id !== 'me') {
        try {
            let currentUser = await User.findByPk(req.session.passport.user);

            if (!currentUser)
                return res.status(404).send({
                    message: 'User was not found',
                    meta: {userId: req.session.passport.user}
                });

            if (currentUser.type !== 'admin')
                return res.status(400).send({
                    message: 'This user has no permissions for updating other users'
                });

        } catch (e) {
            return res.status(502).send({
                message: 'Some error occurred while searching user from session',
                meta: {
                    error: e.message,
                    userId: req.session.passport.user
                }
            });
        }
    }

    let userId = req.params.id === 'me' ? req.session.passport.user : req.params.id;

    let ctx = {
        req, res, userId
    };
    try {
        await File.upload(ctx);
    } catch (e) {
        res.status(502).send({
            message: 'Some error occurred while uploading image for user',
            meta: {
                error: e.message,
                userId
            }
        });
    }
};

const destroy = async (req, res) => {
    try {
        let file = await File.findByPk(req.params.id);
        if (!file)
            return res.status(404).send({
                message: 'Cannot find file with provided id',
                meta: { fileId: req.params.id }
            });

        if (file.userId !== req.session.passport.user) {
            let currentUser = await User.findByPk(req.session.passport.user);

            if (!currentUser)
                return res.status(404).send({
                    message: 'User was not found',
                    meta: {userId: req.session.passport.user}
                });

            if (currentUser.type !== 'admin')
                return res.status(400).send({
                    message: 'This user has no permissions for deleting files of other users'
                });
        }
        await file.destroy();
        res.sendStatus(204);
    }catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while trying to delete user\'s image',
            meta: {
                error: e.message,
                fileId: req.params.id,
                userId: req.session.passport.user
            }
        });
    }
};

module.exports = {
    upload,
    destroy
};
