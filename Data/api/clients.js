const knex = require("../knex");

function addClient(client) {
    return knex("clients").insert(client);
}

function getClient(id) {
    return knex.raw(
        "SELECT C.clientname,C.sitename,D.url from clients C left join details D on C.cid = D.cid where C.cid = ?",
        [id]
    );
}

function getDetails(id) {
    return knex.raw("SELECT * FROM details where cid = ?", [id]);
}

function updateDetails(id, url) {
    return knex.raw("UPDATE details set url = ? where cid = ?", [url, id]);
}

function getAllClients() {
    return knex("clients").select("*");
}

function deleteClient(id) {
    return knex("clients").where("cid", id).del();
}

function updateClient(id, client) {
    return knex("clients").where("cid", id).update(client);
}

function addDetails(detail) {
    return knex("details").insert(detail);
}

module.exports = {
    addClient,
    getDetails,
    getAllClients,
    deleteClient,
    getClient,
    updateClient,
    addDetails,
    updateDetails,
};
