/**
 * Created by David Cruz on 04/08/2017.
 */
'use strict';

let express = require('express');
let router = express.Router();
let randomString = require('randomstring');
let userUtil = require('../util/user-util');

let userModel = require('../models/user-model');

/* CREATE user. */
router.post('/', (req, res, next) => {

    // Acá se encripta la contraseña antes de guardar
    let user = req.body;

    user.salt = randomString.generate(17);
    user.password = userUtil.encryptUserPassword(user.salt, user.password);

    userModel.create(req.body, (err, userCreated) => {
        if (err) {
            return next(err);
        }
        res.json(userCreated);
    });
});

/* GET user by email. */
router.get('/:email', (req, res, next) => {
    userModel.findOne({email: req.params.email}, (err, user) => {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

/* GET user by email with decrypted password. */
router.post('/login', (req, res, next) => {
    userModel.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user === 'undefined' || user === null) {
            res.json({message: 'User does not exists', status: 404});
        } else {
            // Acá se desencripta y compara la contraseña antes de retornar
            user.password = userUtil.decryptUserPassword(user.salt, user.password);

            if (user.password === req.body.password) {
                res.json({message: 'Password Match', status: 200, user: user});
            } else {
                res.json({message: 'Wrong Password', status: 4041});
            }
        }
    });
});

module.exports = router;