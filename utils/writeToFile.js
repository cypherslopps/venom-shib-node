const path = require("path");
const fs = require("fs");

module.exports = (dirname, data) => {
    console.log(data, dirname)
    fs.writeFileSync(path.join(dirname, "/database/transactions.json"), data, "utf-8");
};