const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const bodyParser = require("body-parser");
const connectDb = require("./config/dbConnection");
const Transaction = require("./models/transactionModel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

connectDb();

// Mongo password: r5ckVgHJKxscAwrq

app.post("/burn", upload.single('image'), asyncHandler(async (req, res) => {
    const { userId, name, symbol, transaction } = req.body;
    const { filename } = req.file;
    
    if(userId || name || symbol || transaction || filename) {
        try {
            const data = {
                userId,
                token: {
                    name,
                    symbol,
                    image: {
                        data: fs.readFileSync(path.join(__dirname + '/uploads/' + filename)),
                        contentType: 'image/png'
                    },
                },
                transactionId: transaction,
                date: new Date()
            };
            
            const transactionResponse = await Transaction.create(data);
            res.json({ message: "Success" })
        } catch(err) {
            res.status(400).json({
                title: "Error",
                message: "Error uploading data"
            })
        }
    } else {
        req.status(400).json({ title: "Error", message: "Post all form data" });
    }
}));

app.get("/burn-list", asyncHandler(async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch(err) {
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
}));

app.get("/burn-list/:userId", asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch(err) {
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
}));

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});