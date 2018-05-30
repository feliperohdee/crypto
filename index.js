const crypto = require('crypto');

module.exports = (key, algorithm = 'aes-256-cbc') => {
    if (!key) {
        throw new Error('no key provided.');
    }

    function encrypt(text) {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
    
        encrypted = Buffer.concat([encrypted, cipher.final()]);
    
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    
    function decrypt(text) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
    
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    
        return decrypted.toString();
    }
    
    return {
        encrypt,
        decrypt
    };
};