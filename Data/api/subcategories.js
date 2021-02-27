const knex = require("../knex");

function addSubcategory(subcategory) {
    return knex("subcategories").insert(subcategory);
}

function getAllSubcategories() {
    return knex("subcategories").select("*");
}

function getSubcategory(id) {
    return knex("subcategories").where("subcatid", id).select("*");
}

function deleteSubcategory(id) {
    return knex("subcategories").where("subcatid", id).del();
}

function updateSubcategory(id, subcategory) {
    return knex("subcategories").where("subcatid", id).update(subcategory);
}

module.exports = {
    addSubcategory,
    getAllSubcategories,
    deleteSubcategory,
    updateSubcategory,
    getSubcategory,
};
