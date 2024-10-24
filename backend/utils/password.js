const bcrypt = require('bcrypt');

const saltSize = 10;

function encrypt(original) {
    const salt = bcrypt.genSaltSync(saltSize);
    return bcrypt.hashSync(original, salt);
}

function validate(original, encrypted) {
    return bcrypt.compareSync(original, encrypted);
}

module.exports = { encrypt, validate };
