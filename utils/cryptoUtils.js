const crypto = require("crypto");

// Encrypt function
const encrypt = (plaintext, keyMaterial, level) => {
  const keyBuffer = Buffer.from(keyMaterial, "base64");
  let result;

  switch(level) {
    case 1: // OTP
      const textBytes = Buffer.from(plaintext);
      const cipherBytes = Buffer.alloc(textBytes.length);
      for (let i=0;i<textBytes.length;i++){
        cipherBytes[i] = textBytes[i] ^ keyBuffer[i % keyBuffer.length];
      }
      result = cipherBytes.toString("base64");
      break;

    case 2: // AES-256-GCM
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv("aes-256-gcm", keyBuffer, iv);
      let encrypted = cipher.update(plaintext, "utf8", "base64");
      encrypted += cipher.final("base64");
      const tag = cipher.getAuthTag().toString("base64");
      result = JSON.stringify({ ciphertext: encrypted, iv: iv.toString("base64"), tag });
      break;

    case 3: // Hybrid (simulate)
    case 4: // Classical fallback
    default:
      result = Buffer.from(plaintext).toString("base64");
  }

  return result;
};

// Decrypt function
const decrypt = (ciphertext, keyMaterial, level) => {
  const keyBuffer = Buffer.from(keyMaterial, "base64");
  let result;

  switch(level) {
    case 1: // OTP
      const cipherBytes = Buffer.from(ciphertext, "base64");
      const plainBytes = Buffer.alloc(cipherBytes.length);
      for (let i=0;i<cipherBytes.length;i++){
        plainBytes[i] = cipherBytes[i] ^ keyBuffer[i % keyBuffer.length];
      }
      result = plainBytes.toString();
      break;

    case 2: // AES-256-GCM
      const obj = JSON.parse(ciphertext);
      const decipher = crypto.createDecipheriv("aes-256-gcm", keyBuffer, Buffer.from(obj.iv,"base64"));
      decipher.setAuthTag(Buffer.from(obj.tag,"base64"));
      result = decipher.update(obj.ciphertext,"base64","utf8") + decipher.final("utf8");
      break;

    case 3:
    case 4:
    default:
      result = Buffer.from(ciphertext, "base64").toString();
  }

  return result;
};

module.exports = { encrypt, decrypt };
