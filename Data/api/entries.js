const knex = require("../knex");

function addEntry(entry) {
    return knex("entries").insert(entry);
}

function getAllEntries() {
    return knex("entries").select("*");
}

function getAllEntriesOfSite(id) {
    return knex.raw(
        "select E.eid,E.cid,E.catid,C.catname,E.subcatid,S.subcatname,E.description,E.length,E.height,E.mrate,E.lrate,E.cpaid,E.total,E.notes from entries E left join categories C on C.catid = E.catid left join subcategories S on S.subcatid = E.subcatid where E.cid = ?",
        [id]
    );
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
    getAllEntriesOfSite,
};
