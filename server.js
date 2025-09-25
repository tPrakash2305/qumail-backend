const express = require("express");
const bodyParser = require("body-parser");

const keyRoutes = require("./routes/keyRoutes");
const mailRoutes = require("./routes/mailRoutes");

const app = express();          // ✅ Initialize app first
app.use(bodyParser.json());

// Optional: health check route
app.get("/", (req, res) => {
  res.send("QuMail backend is live and running!");
});

// Routes
app.use("/api", keyRoutes);
app.use("/api", mailRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuMail backend running on port ${PORT}`));
