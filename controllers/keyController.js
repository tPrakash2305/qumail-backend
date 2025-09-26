const { generateKey, determineSecurityLevel } = require('../utils/cryptoUtils');

// Controller to handle key request
exports.requestKey = (req, res) => {
  // Generate a unique ID for each key
  const keyId = Date.now().toString();
  
  // Generate the cryptographic key
  const key = generateKey();

  // Determine security level
  const securityLevel = determineSecurityLevel(key);

  // Respond with key details
  res.json({ keyId, key, securityLevel });
};
