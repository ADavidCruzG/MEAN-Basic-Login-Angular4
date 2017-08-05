/**
 * Created by David Cruz on 04/08/2017.
 */
'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true, index: true},
        password: {type: String, required: true},
        salt: {type: String, required: true}
    }
);

module.exports = mongoose.model('User', UserSchema);