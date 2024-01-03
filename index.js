const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeFirebaseApp } = require("./lib/firebase");

// Routes
const burnRoute = require("./routes/Burn.route");
// const swapRoute = require("./routes/Swap.route");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize Firebase 
initializeFirebaseApp();

app.use("/api/burn", burnRoute);
// app.use("/api/swap", swapRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
