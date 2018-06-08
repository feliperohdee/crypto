const assert = require('assert');
const crypto = require('./');
const {
    encrypt,
    decrypt
} = crypto('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU');

const {
    decrypt: wrongDecrypt
} = crypto('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSV');

assert.strictEqual(decrypt(encrypt('encrypt')), 'encrypt');
assert.strictEqual(decrypt(encrypt('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU')), 'mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU');

try {
    wrongDecrypt(encrypt('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU'));
} catch(e) {
    assert.strictEqual(e.message, 'error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt');
}