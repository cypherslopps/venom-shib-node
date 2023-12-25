const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const writeToFile = require("./utils/writeToFile");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/burn", asyncHandler(async (req, res) => {
    const { userId, name, image, symbol, transaction } = req.body;
    
    if(userId || name || symbol || transaction || image) {
        try {
            const data = {
                userId,
                token: {
                    name,
                    symbol,
                    image: image
                },
                transactionId: transaction,
                createdAt: new Date()
            };
            
            // Get transactions data
            const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, "/database/transactions.json"), "utf-8"));

            // Add new transaction data
            transactions.push(data);
            
            // Update transactions data
            writeToFile(__dirname, JSON.stringify(transactions));
            res.json({ message: "Success" })
        } catch(err) {
            res.status(400).json({
                title: "Error",
                message: "Error uploading data"
            })
        }
    } else {
        res.status(400).json({ title: "Error", message: "Post all form data" });
    }
}));

app.get("/burn-list", (req, res) => {
    try {
        const transactions = fs.readFileSync(path.join(__dirname, "/database/transactions.json"), "utf-8");
        res.json(JSON.parse(transactions));
    } catch(err) {
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
});

app.get("/burn-list/:userId", asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // const transactions = await Transaction.find({ userId });
        const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, "/database/transactions.json"), "utf-8"));
        const userTransaction = transactions.filter(transaction => transaction.userId === userId);
        
        userTransaction ? res.json(userTransaction) : res.json([]);
    } catch(err) {
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
}));

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});