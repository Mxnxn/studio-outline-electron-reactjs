const knex = require("./knex");

async function createClient() {
    if (!(await knex.schema.hasTable("clients")))
        await knex.schema.createTable("clients", (table) => {
            table.increments("cid");
            table.string("clientname");
            table.string("sitename");
            table.string("date");
        });
}

async function createCategory() {
    if (!(await knex.schema.hasTable("categories")))
        await knex.schema.createTable("categories", (table) => {
            table.increments("catid");
            table.string("catname");
        });
}
async function createSubcategory() {
    if (!(await knex.schema.hasTable("subcategories")))
        await knex.schema.createTable("subcategories", (table) => {
            table.increments("subcatid");
            table.string("subcatname");
        });
}
async function createProduct() {
    if (!(await knex.schema.hasTable("products")))
        await knex.schema.createTable("products", (table) => {
            table.increments("pid");
            table.string("pname");
            table.integer("mrate");
            table.integer("lrate");
        });
}
async function createEntry() {
    if (!(await knex.schema.hasTable("entries")))
        await knex.schema.createTable("entries", (table) => {
            table.increments("eid");
            table.integer("cid").references("cid").inTable("clients");
            table.integer("catid").references("catid").inTable("categories");
            table.integer("subcatid").references("subcatid").inTable("subcategories");
            table.string("description");
            table.float("length");
            table.float("height");
            table.float("mrate");
            table.float("lrate");
            table.float("cpaid");
            table.float("total");
            table.float("notes");
        });
}

module.exports = {
    createCategory,
    createClient,
    createEntry,
    createProduct,
    createSubcategory,
};
