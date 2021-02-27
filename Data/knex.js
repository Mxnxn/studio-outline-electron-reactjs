const knex = require("knex");

const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "Data/binaries/data.sqlite",
    },
    useNullAsDefault: true,
});

module.exports = connectKnex;
