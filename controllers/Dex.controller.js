const asyncHandler = require("express-async-handler");
const { 
    uploadProcessedData, 
    getData, 
    getSingleData 
} = require("../lib/firebase");

const collectionName = "dex";

const createUser = asyncHandler(async (req, res) => {
    const { walletAddress } = req.body;

    if(walletAddress) {
        try {
            const id = Math.random(4).toString(36).slice(2);
            const data = {
                id,
                walletAddress,
                createdAt: Date.now()
            };

            await uploadProcessedData(collectionName, data);

            res.json({ message: "User created successfully", status: "success" });
        } catch(err) {
            res.status(400).json({
                message: "There was an error adding new user.",
                status: "error"
            })
        }
    } else {

    }
});

const getUsers = asyncHandler(async (req, res) => {
    res.json([{ id: 0, walletAddress: "0:8b3242esfdsfhw3hlk32q4k324lk32" }])
});

module.exports = {
    createUser,
    getUsers
}

