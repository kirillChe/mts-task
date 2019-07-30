const R = require('ramda')
    , Busboy = require('busboy')
    , path = require('path')
    , fs = require('fs')
    , events = require('events')
    , sequelize = require('sequelize')
    , Op = require('sequelize').Op;

//internal modules
const filePath = __dirname + '/../../public'
    , {User, File} = require('../models');

const create = async (req, res) => {
    let userData = {};

    let user;
    try {
        user = await User.create(userData);
        console.log('usersController.js :22', user);
    }catch (e) {
        return res.status(502).send({
            message: 'Cannot create a user',
            meta: {
                error: e.message,
                userData
            }
        });
    }
};

const update = async (req, res) => {

    let userId = req.params.id === 'me' ? req.session.passport.user : req.params.id;

    let user = null;
    try {
        user = await User.findByPk(userId);

        if (!user)
            return res.status(404).send({
                message: 'User was not found',
                meta: {userId}
            });

    } catch (e) {
        return res.status(502).send({
            message: 'Some error occurred while searching user',
            meta: {
                error: e.message,
                userId
            }
        });
    }

    let busboy = new Busboy({headers: req.headers});
    let userData = {}, fileProvided = false;
    const em = new events.EventEmitter();

    busboy.on('field', (fieldname, val) => {
        console.log('Field [' + fieldname + ']: value: ' + val);

        if (fieldname === 'userData') {
            try{
                userData = JSON.parse(val);
            } catch (e) {
                return res.status(502).send({
                    message: 'Field userData must be stringified object',
                    meta: {
                        error: e.message,
                        userData
                    }
                });
            }
        }
    });

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        fileProvided = true;

        //validate file type
        if (R.not(R.equals(R.head(R.split('/', mimetype)), 'image'))) {
            console.log('Not allowed file type');
            return em.emit('uploadFinished');
        }

        //validate file size
        if (req.headers['content-length'] / 1024 > 400) {
            console.log('Not allowed file size');
            return em.emit('uploadFinished');
        }

        let name = `${userId}-avatar`;
        let saveTo = path.join(filePath, name);
        let data = {
            userId,
            location: `/api/public/${name}`
        };

        //first, delete old avatar if exist
        try {
            fs.unlinkSync(saveTo);
            await File.destroy({where: data});
        } catch (e) {
            //@todo send to kibana
            console.log('Failed to delete file model or unlink file (avatar): ', e);
        }

        file.on('error', error => {
            //@todo send to kibana and add error handler
            console.log('Upload avatar failed with error: ', error);
            em.emit('uploadFinished');
        });

        file.on('end', async () => {
            //create file model or delete file from fs if got error
            try {
                let file = await File.create(data);
                userData.avatar = file.id;

            } catch (e) {
                console.log('Failed to create file model (avatar): ', e);
                fs.unlinkSync(saveTo);
            }
            em.emit('uploadFinished');
        });
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('error', e => {
        console.log('Upload failed: ', e);
        res.status(502).send({
            message: 'Some error occurred while file/s uploading',
            meta: { error: e.message }
        });
    });

    busboy.on('finish', async () => {
        console.log('Upload complete');

        try {
            //@todo REFACTOR
            if (fileProvided) {

                em.on('uploadFinished', async () => {
                    //update user model
                    await helper.updateUserWithAssociations({user, userData});
                    res.sendStatus(201);
                });

            } else {

                //update user model
                await helper.updateUserWithAssociations({user, userData});
                res.sendStatus(201);
            }

        } catch (e) {
            console.log('Failed to update user model: ', e);
            res.status(502).send({
                message: 'Some error occurred while updating a user',
                meta: {
                    error: e.message,
                    userData
                }
            });
        }
    });

    req.pipe(busboy);
};

module.exports = {
    create,
    update,
};
