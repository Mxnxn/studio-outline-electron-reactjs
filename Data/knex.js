const knex = require("knex");
<<<<<<< HEAD
// const fs = require("fs");
const path = require("path");
const apppath = path.resolve(".");
// const os = require("os");
=======
const fs = require("fs");
const path = require("path")
const apppath = path.resolve(".");
const os = require("os");
>>>>>>> b97c2c999a720f28db0d24c12f567e2bbb0f611e
// if (!fs.existsSync("./data")) {
//     fs.mkdirSync("./data");
//     fs.mkdirSync("./data/binaries");
// }
// os.platform() for OS
// app path will resolve current working directory path from root
// console.log(os.platform(),apppath);
const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: apppath + "/data.sqlite",

    },
    useNullAsDefault: true,
});

module.exports = connectKnex;
