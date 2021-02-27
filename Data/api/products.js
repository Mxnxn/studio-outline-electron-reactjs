const knex = require("../knex");

function addProduct(product) {
    return knex("products").insert(product);
}

function getAllProducts() {
    return knex("products").select("*");
}

function getProduct(id) {
    return knex("products").where("pid", id).select("*");
}

function deleteProduct(id) {
    return knex("products").where("pid", id).del();
}

function updateProduct(id, product) {
    return knex("products").where("pid", id).update(product);
}

module.exports = {
    addProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
};
