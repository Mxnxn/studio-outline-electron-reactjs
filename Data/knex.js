const knex = require("knex");
const fs = require("fs");
const path = require("path")
const apppath = path.resolve(".");
const os = require("os");
// if (!fs.existsSync("./data")) {
//     fs.mkdirSync("./data");
//     fs.mkdirSync("./data/binaries");
// }
console.log(os.platform(),apppath);
const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: apppath+"/data.sqlite"
    },
    useNullAsDefault: true,
});

module.exports = connectKnex;
