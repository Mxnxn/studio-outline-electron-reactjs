const knex = require("../knex");

function addEntry(entry) {
    return knex("entries").insert(entry);
}

function getAllEntries() {
    return knex("entries").select("*");
}

function getEntry(id) {
    return knex("entries").where("eid", id).select("*");
}

function deleteEntry(id) {
    return knex("entries").where("eid", id).del();
}

function updateEntry(id, entry) {
    return knex("entries").where("eid", id).update(entry);
}

module.exports = {
    addEntry,
    getAllEntries,
    deleteEntry,
    updateEntry,
    getEntry,
};
