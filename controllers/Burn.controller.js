const asyncHandler = require("express-async-handler");
const { 
    uploadProcessedData, 
    getData, 
    getSingleData 
} = require("../lib/firebase");

const collectionName = "burn-transactions";

// @notice: Add new burnt transaction
const createBurntToken = asyncHandler(async (req, res) => {
    const { userId, name, amount, image, symbol, transaction } = req.body;

    if(userId || name || symbol || amount || transaction || image) {
        try {
            const data = {
                userId,
                token: {
                    name,
                    symbol,
                    amount,
                    image: image
                },
                transactionId: transaction,
                createdAt: Date.now()
            };

            // Upload burnt token data
            await uploadProcessedData(collectionName, data);

            res.json({ title: "Success", message: "Burnt token successfully uploaded"});
        } catch(err) {
            res.status(400).json({
                title: "Error",
                message: "Error uploading data"
            })
        }
    } else {
        res.status(400).json({ title: "Error", message: "Post all form data" });
    }
});

// @notice: Get all burnt tokens
const getAllBurntTokens = asyncHandler(async (req, res) => {
    try {
        const burntTokens = await getData(collectionName);

        res.json(burntTokens);
    } catch(err) {
        res.status(400).json({ 
            title: "Fetch Failed", 
            message: "Failed to fetch transactions" 
        })
    }
});

// @notice: Get a single transaction
const getUserBurntTokens = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if(userId) {
        try {
            const burnTransaction = await getSingleData(collectionName, "userId", userId);
            
            res.json(burnTransaction)
        } catch(err) {
            res.status(400).json({ title: "Fetch Failed",  message: "Failed to fetch transactions" })
        }
    } else {
        res.status(400).json({ title: "Invalid params",  message: "Params does not exist" })
    } 
}) 

module.exports = {
    createBurntToken,
    getAllBurntTokens,
    getUserBurntTokens
};