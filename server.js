//const express = require("express");
//const bodyParser = require("body-parser");
//const keyRoutes = require("./routes/keyRoutes");

import express from "express";
import bodyParser from "body-parser";
import keyRoutes from "./routes/keyRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";

const app = express();
app.use(bodyParser.json());

//  Health check route
app.get("/", (req, res) => {
  res.send(" QuMail Key Manager is live and ready to distribute keys!");
});

//  Mount API routes
app.use("/api", keyRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` QuMail Key Manager running on port ${PORT}`));
