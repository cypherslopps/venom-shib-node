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

app.post("/burn-list", upload.single('image'), asyncHandler(async (req, res) => {
    const { userId, name, transactionId } = req.body;
    const { filename } = req.file;
    
    if(userId || name || transactionId || file) {
        try {
            const data = {
                userId,
                token: {
                    name: req.body.name,
                    image: {
                        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                        contentType: 'image/png'
                    }
                },
                transactionId: req.body.transaction,
                date: new Date()
            };
            
            const transactionResponse = await Transaction.create(data);
            console.log(transactionResponse)
            
                    // console.log(item)
                    // // item.save();
                    // res.redirect('/');
            console.log(transactionResponse)
            res.json({ message: "Success" })
        } catch(err) {
            console.log(err);
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
        console.log(transactions)
        res.json(transactions);
    } catch(err) {
        console.log(err)
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
}));

app.get("/burn-list/:userId", asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });
        console.log(transactions)
        res.json(transactions);
    } catch(err) {
        console.log(err)
        res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
    }
}));

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});