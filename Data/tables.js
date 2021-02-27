const knex = require("./knex");

function createClient() {
    if (!knex.schema.hasTable("client"))
        knex.schema.createSchemaIfNotExists("clients", (table) => {
            table.increments("cid");
            table.string("clientname");
            table.string("sitename");
            table.string("date");
        });
}

function createCategory() {
    if (!knex.schema.hasTable("categories"))
        knex.schema.createTable("categories", (table) => {
            table.increments("catid");
            table.string("catname");
        });
}
function createSubcategory() {
    if (!knex.schema.hasTable("subcategories"))
        knex.schema.createTable("subcategories", (table) => {
            table.increments("subcatid");
            table.string("subcatname");
        });
}
function createProduct() {
    if (!knex.schema.hasTable("products"))
        knex.schema.createTable("products", (table) => {
            table.increments("pid");
            table.string("pname");
            table.integer("mrate");
            table.integer("lrate");
        });
}
function createEntry() {
    if (!knex.schema.hasTable("entries"))
        knex.schema.createTable("entries", (table) => {
            table.increments("eid");
            table.integer("cid").references("cid").inTable("clients");
            table.integer("catid").references("catid").inTable("categories");
            table.integer("subcatid").references("subcatid").inTable("subcategories");
            table.string("description");
            table.float("qty");
            table.float("mrate");
            table.float("lrate");
            table.float("cpaid");
            table.float("total");
        });
}

module.exports = {
    createCategory,
    createClient,
    createEntry,
    createProduct,
    createSubcategory,
};
