const app = require("express").Router();
const Entry = require("../api/entries");

app.use("/*", (req, res, next) => next());

app.post("/add", async (req, res) => {
    try {
        if (!req.body.cid || !req.body.catid || !req.body.product) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.addEntry({
            cid: req.body.cid,
            catid: req.body.catid,
            subcatid: req.body.subcatid ? req.body.subcatid : null,
            description: req.body.product,
            qty: req.body.qty,
            type: req.body.type,

            mrate: req.body.mrate,
            lrate: req.body.lrate,
            cpaid: req.body.cpaid,
            total: req.body.total,
        });
        const obj = await Entry.getEntry(result[0]);
        return res.status(200).json({ data: obj[0], message: "Successful!" });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.get("/get", async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.getEntry(req.body.id);
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
        const result = await Entry.getAllEntries();
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.get("/getall/:id", async (req, res) => {
    try {
        const result = await Entry.getAllEntriesOfSite(req.params.id);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.deleteEntry(req.params.id);
        return res.status(200).json({ message: "Delete Successful!!" });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/update", async (req, res) => {
    try {
        if (!req.body.eid || !req.body.cid || !req.body.catid || !req.body.product) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.updateEntry(req.body.eid, {
            cid: req.body.cid,
            catid: req.body.catid,
            subcatid: req.body.subcatid ? req.body.subcatid : null,
            description: req.body.product,
            qty: req.body.qty,
            type: req.body.type,
            mrate: req.body.mrate,
            lrate: req.body.lrate,
            cpaid: req.body.cpaid,
            total: req.body.total,
        });
        return res.status(200).json({ message: "Successful!!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

module.exports = app;
