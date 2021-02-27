const app = require("express").Router();
const Subcategory = require("../Data/api/subcategories");
app.use("/*", (req, res, next) => next());
app.post("/add", async (req, res) => {
    try {
        if (!req.body.subcatname) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Subcategory.addSubcategory({
            subcatname: req.body.subcatname,
        });
        const obj = await Subcategory.getSubcategory(result[0]);
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
        const result = await Subcategory.getSubcategory(req.body.id);
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
        const result = await Subcategory.getAllSubcategories();
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
        const result = await Subcategory.deleteSubcategory(id);
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
        if (!req.body.subcatname || !req.body.id) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Subcategory.updateSubcategory(req.body.id, { subcatname: req.body.subcatname });
        return res.status(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

module.exports = app;
