const crypto = require("crypto");
const keysDB = require("../models/keyDB");
const mailsDB = require("../models/mailDB");
const { otpEncryptDecrypt, aesEncrypt, aesDecrypt } = require("../utils/cryptoUtils");

// Send Mail
const sendMail = (req, res) => {
    const { fromUser, toUser, subject, body, securityLevel } = req.body;

    // Simulate key request
    const keyId = crypto.randomUUID();
    const keyBytes = crypto.randomBytes(32);
    const keyMaterial = keyBytes.toString("base64");
    keysDB[keyId] = keyMaterial;

    let bodyCipher;

    switch(securityLevel){
        case 1: // OTP
            bodyCipher = otpEncryptDecrypt(body, keyMaterial);
            break;
        case 2: // AES
            bodyCipher = JSON.stringify(aesEncrypt(body, keyMaterial));
            break;
        case 3: // Hybrid (simulated)
        case 4: // Classical fallback
        default:
            bodyCipher = Buffer.from(body).toString("base64");
    }

    mailsDB.push({ id: mailsDB.length + 1, fromUser, toUser, subject, bodyCipher, keyId, securityLevel });

    res.json({ status: "ok", keyId, securityLevel });
};

// Inbox Retrieval
const getInbox = (req, res) => {
    const user = req.params.user;

    const inbox = mailsDB
        .filter(mail => mail.toUser === user)
        .map(mail => {
            const key = keysDB[mail.keyId];
            let bodyPlain;

            switch(mail.securityLevel){
                case 1: // OTP
                    bodyPlain = otpEncryptDecrypt(Buffer.from(mail.bodyCipher, "base64").toString(), key);
                    delete keysDB[mail.keyId]; // mark OTP as consumed
                    break;
                case 2: // AES
                    const cipherObj = JSON.parse(mail.bodyCipher);
                    bodyPlain = aesDecrypt(cipherObj, key);
                    break;
                default: // Hybrid / Classical
                    bodyPlain = Buffer.from(mail.bodyCipher, "base64").toString();
            }

            return { ...mail, body: bodyPlain };
        });

    res.json(inbox);
};

module.exports = { sendMail, getInbox };
