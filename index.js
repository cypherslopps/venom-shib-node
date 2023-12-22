const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use((req, res) => {
    res.send("Hello world");
})

app.post("/burn-list", (req, res) => {
    console.log(req.body);
});

app.get("/burn-list", (req, res) => {
    res.json([
        {name: "Transaction 1"},
        {name: "Transaction 2"},
        {name: "Transaction 3"},
        {name: "Transaction 4"}
    ]);
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});