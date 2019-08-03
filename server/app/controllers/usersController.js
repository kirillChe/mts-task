const R = require('ramda');
const {User} = require('../models');

const create = async (req, res) => {
    await User.create(req.body);
    res.sendStatus(200);
};

const update = async (req, res) => {

    let user = null;
    try {
        user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(404).send({
                message: 'User was not found',
                meta: {userId: req.params.id}
            });

    } catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while searching user',
            meta: {
                error: e.message,
                userId: req.params.id
            }
        });
    }

    await user.update(req.body);
    res.sendStatus(200);
};

const destroy = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (!user)
            return res.status(404).send({
                message: 'Cannot find user with provided id',
                meta: { userId: req.params.id }
            });

        await user.destroy();
        res.sendStatus(204);
    }catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while trying to delete user',
            meta: {
                error: e.message,
                userId: req.params.id,
            }
        });
    }
};

const find = async (req, res) => {
    let users = [];
    try {
        users = await User.findAll();
        users = R.map(user => user.toJSON(), users);
    } catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while searching the users',
            meta: {error: e.message}
        });
    }

    res.status(200).json(users);
};

module.exports = {
    create,
    update,
    destroy,
    find
};
