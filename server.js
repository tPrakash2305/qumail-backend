const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const keyRoutes = require("./routes/keyRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("QuMail Key Manager & Crypto Service is running!");
});

// API routes
app.use("/api", keyRoutes);
app.use("/api", cryptoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuMail backend running on port ${PORT}`));
