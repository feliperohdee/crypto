const crypto = require('crypto');

const algorithm = process.env.CRYPTO_ALGORITHM || 'aes-256-cbc';
const key = process.env.CRYPTO_KEY;

function encrypt(text) {
    if (!key) {
        throw new Error('no process.env.CRYPTO_KEY provided.');
    }

    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    if (!key) {
        throw new Error('no process.env.CRYPTO_KEY provided.');
    }

    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
};