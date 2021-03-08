const app = require("express").Router();
const Client = require("../api/clients");
app.use("/*", (req, res, next) => next());

app.post("/add", async (req, res) => {
    try {
        if (!req.body.clientname || !req.body.sitename) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Client.addClient({
            clientname: req.body.clientname,
            sitename: req.body.sitename,
            date: new Date(),
        });
        console.log(await Client.getClient(result[0]));
        return res.status(200).json({ data: result[0], message: "Successfully added!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.get("/get/:cid", async (req, res) => {
    try {
        if (!req.params.cid) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Client.getClient(req.params.cid);
        return res.status(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.get("/getall", async (req, res) => {
    try {
        const result = await Client.getAllClients();
        return res.json({ data: result });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/delete", async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Client.deleteClient(req.body.id);
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/update", async (req, res) => {
    try {
        if (!req.body.clientname || !req.body.sitename || !req.body.id) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Client.updateClient(req.body.id, {
            clientname: req.body.clientname,
            sitename: req.body.sitename,
        });
        return res.status(200).json({ message: "successfully added!", status: true });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

module.exports = app;
