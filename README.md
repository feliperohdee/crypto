        # yarn add simple-encrypt-decrypt

        const assert = require('assert');
        const crypto = require('simple-encrypt-decrypt');
        const {
            encrypt,
            decrypt
        } = crypto('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU'); // 32 byte key

        assert.strictEqual(decrypt(encrypt('encrypt')), 'encrypt');
        assert.strictEqual(decrypt(encrypt('mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU')), 'mcpT)(_C-5n=nv"/t~4zBGtnx8/.YTSU');