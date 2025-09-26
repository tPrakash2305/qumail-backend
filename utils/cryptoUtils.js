const crypto = require('crypto');

function generateKey() {
  // Generate 256-bit (32 bytes) random key
  return crypto.randomBytes(32).toString('hex');
}

function determineSecurityLevel(key) {
  // Simple example based on key length
  if (key.length === 64) return 'Level 3 - High Security'; 
  else if (key.length === 32) return 'Level 2 - Medium Security';
  else return 'Level 1 - Low Security';
}

module.exports = { generateKey, determineSecurityLevel };
