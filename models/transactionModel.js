const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, "User id is required"],
        },
        token: {
            name: { 
                type: String,
                required: [true, "Please add token name"] 
            },
            image: {
                data: Buffer,
                contentType: String
            },
            symbol: {
                type: String,
                required: [true, "Please add token symbol"]
            }
        },
        transactionId: {
            type: String,
            required: [true, "Please add a transaction id"],
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Transaction", transactionSchema); 