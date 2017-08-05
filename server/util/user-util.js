/**
 * Created by David Cruz on 04/08/2017.
 */
'use strict';

let crypto = require('crypto');

module.exports = {
    encryptUserPassword: (salt, passwordToEncrypt) => {
        let cipher = crypto.createCipher('aes-256-cbc', salt);
        cipher.update(passwordToEncrypt, 'utf8', 'base64');
        return cipher.final('base64');
    },
    decryptUserPassword: (salt, passwordToDecrypt) => {
        let decipher = crypto.createDecipher('aes-256-cbc', salt);
        decipher.update(passwordToDecrypt, 'base64', 'utf8');
        return decipher.final('utf8');
    }
};