const crypto = require('crypto');

const smallOrangeCrypto = (key, defaultIv, algorithm = 'aes-256-cbc') => {
    if (!key) {
        throw new Error('no key provided.');
    }

    if (!Buffer.isBuffer(key)) {
        key = Buffer.from(key);
    }
    
    if (defaultIv && !Buffer.isBuffer(defaultIv)) {
        defaultIv = Buffer.from(defaultIv, 'hex');
    }

    function encrypt(text) {
        let iv = defaultIv;

        if (!iv) {
            iv = crypto.randomBytes(16);
        }

        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([
            encrypted, 
            cipher.final()
        ]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    function decrypt(hash) {
        let [
            iv, 
            text
        ] = hash.split(':');
        
        iv = Buffer.from(iv, 'hex');
        text = Buffer.from(text, 'hex');

        return decryptBuffer(iv, text);
    }
    
    function decryptBuffer(iv, buffer) {
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(buffer);

        decrypted = Buffer.concat([
            decrypted, 
            decipher.final()
        ]);

        return decrypted.toString();
    }

    return {
        encrypt,
        decrypt,
        decryptBuffer
    };
};

smallOrangeCrypto.randomBytes = (size = 16) => {
    return crypto.randomBytes(size);
};

module.exports = smallOrangeCrypto;