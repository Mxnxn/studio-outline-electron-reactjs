const app = require("express").Router();
const Entry = require("../Data/api/entries");
app.use("/*", (req, res, next) => next());
app.post("/add", async (req, res) => {
    try {
        if (
            !req.body.eid ||
            !req.body.client ||
            !req.body.categories ||
            !req.body.subcategories ||
            !req.body.description ||
            !req.body.qty ||
            !req.body.mrate ||
            !req.body.lrate ||
            !req.body.cpaid ||
            !req.body.total
        ) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.addEntry({
            pname: req.body.productname,
            mrate: req.body.mrate,
            lrate: req.body.lrate,
        });
        const obj = await Entry.getEntry(result[0]);
        return res.json(200).json({ data: obj[0] });
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
        return res.json(200).json({ data: result[0] });
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
        return res.json(200).json({ data: result });
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
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.deleteEntry(id);
        return res.json(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/update", async (req, res) => {
    try {
        if (
            !req.body.eid ||
            !req.body.client ||
            !req.body.categories ||
            !req.body.subcategories ||
            !req.body.description ||
            !req.body.qty ||
            !req.body.mrate ||
            !req.body.lrate ||
            !req.body.cpaid ||
            !req.body.total ||
            !req.body.id
        ) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Entry.updateEntry(req.body.id, {
            eid: req.body.eid,
            client: req.body.client,
            categories: req.body.categories,
            subcategories: req.body.subcategories,
            description: req.body.description,
            qty: req.body.qty,
            mrate: req.body.mrate,
            lrate: req.body.lrate,
            cpaid: req.body.cpaid,
            total: req.body.total,
        });
        return res.status(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

module.exports = app;
