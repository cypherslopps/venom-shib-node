const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, "User id is required"]
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
        },
        transactionId: {
            type: String,
            required: [true, "Please add a transaction id"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Transaction", transactionSchema); 