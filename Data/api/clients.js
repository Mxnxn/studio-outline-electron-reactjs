const knex = require("../knex");

function addClient(client) {
    return knex("clients").insert(client);
}

function getClient(id) {
    return knex("clients").where("cid", id).select("*");
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

module.exports = {
    addClient,
    getAllClients,
    deleteClient,
    getClient,
    updateClient,
};
