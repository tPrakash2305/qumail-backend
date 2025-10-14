const { v4: uuidv4 } = require('uuid');
const { generateKeyPair } = require('../utils/cryptoUtil');
const db = require('../config/db');

exports.createKey = (req, res) => {
    try {
        const keyPair = generateKeyPair();
        const keyId = uuidv4();
        
        const stmt = db.prepare('INSERT INTO keys (id, public_key, private_key) VALUES (?, ?, ?)');
        stmt.run(keyId, keyPair.publicKey, keyPair.privateKey);
        
        res.status(200).json({
            success: true,
            keyId,
            publicKey: keyPair.publicKey
        });
    } catch (error) {
        console.error('Error creating key:', error);
        res.status(500).json({ success: false, error: 'Failed to create key pair' });
    }
};

exports.getKey = (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('SELECT id, public_key FROM keys WHERE id = ?');
        const key = stmt.get(id);
        
        if (!key) {
            return res.status(404).json({ error: 'Key not found' });
        }
        
        res.status(200).json({ key });
    } catch (error) {
        console.error('Error fetching key:', error);
        res.status(500).json({ error: 'Failed to fetch key' });
    }
};
