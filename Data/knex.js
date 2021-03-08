const knex = require("knex");
const fs = require("fs");

if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
    fs.mkdirSync("./data/binaries");
}
const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "data/binaries/data.sqlite",
    },
    useNullAsDefault: true,
});

module.exports = connectKnex;
