const crypto = require('crypto');

const generateKeyPair = () => {
    const keypair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    return keypair;
};

module.exports = { generateKeyPair };
