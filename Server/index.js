const express = require('express');
const app = express();
const Connection = require('./database/db.js');
const Routes = require("./routes/routes.js");
const cors = require("cors");
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

Connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIXED STATIC PATH
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Static folder for images
app.use("/", Routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
