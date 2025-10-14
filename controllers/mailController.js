const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.addMailMetadata = (req, res) => {
  const { sender, receiver, subject } = req.body;
  const id = uuidv4();

  db.run(
    `INSERT INTO mail_metadata (id, sender, receiver, subject) VALUES (?, ?, ?, ?)`,
    [id, sender, receiver, subject],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, sender, receiver, subject });
    }
  );
};

exports.getAllMails = (req, res) => {
  db.all(`SELECT * FROM mail_metadata`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
