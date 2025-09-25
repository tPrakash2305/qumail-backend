const crypto = require("crypto");

// OTP encryption/decryption
function otpEncryptDecrypt(text, key) {
    const textBytes = Buffer.from(text);
    const keyBytes = Buffer.from(key, "base64");
    const cipherBytes = Buffer.alloc(textBytes.length);

    for (let i = 0; i < textBytes.length; i++) {
        cipherBytes[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    return cipherBytes.toString("base64");
}

// AES encryption
function aesEncrypt(text, key) {
    const keyBuf = Buffer.from(key, "base64");
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", keyBuf, iv);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    const tag = cipher.getAuthTag().toString("base64");

    return { ciphertext: encrypted, iv: iv.toString("base64"), tag };
}

// AES decryption
function aesDecrypt(encryptedObj, key) {
    const keyBuf = Buffer.from(key, "base64");
    const iv = Buffer.from(encryptedObj.iv, "base64");
    const decipher = crypto.createDecipheriv("aes-256-gcm", keyBuf, iv);
    decipher.setAuthTag(Buffer.from(encryptedObj.tag, "base64"));
    const decrypted = decipher.update(encryptedObj.ciphertext, "base64", "utf8") + decipher.final("utf8");
    return decrypted;
}

module.exports = { otpEncryptDecrypt, aesEncrypt, aesDecrypt };
