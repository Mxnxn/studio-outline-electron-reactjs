const knex = require("../knex");

function addCategory(category) {
    return knex("categories").insert(category);
}

function getAllCategories() {
    return knex("categories").select("*");
}

function getCategory(id) {
    return knex("categories").where("catid", id).select("*");
}

function deleteCategory(id) {
    return knex("categories").where("catid", id).del();
}

function updateCategory(id, category) {
    return knex("categories").where("catid", id).update(category);
}

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategory,
};
