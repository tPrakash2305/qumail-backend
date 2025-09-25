const express = require("express");
const bodyParser = require("body-parser");

const keyRoutes = require("./routes/keyRoutes");
const mailRoutes = require("./routes/mailRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", keyRoutes);
app.use("/api", mailRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuMail backend running on port ${PORT}`));
