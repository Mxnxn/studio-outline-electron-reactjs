const app = require("express").Router();
const Category = require("../api/categories");

app.use("/*", (req, res, next) => next());
app.post("/add", async (req, res) => {
    try {
        if (!req.body.categoryname) {
            return res.status(400).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Category.addCategory({
            catname: req.body.categoryname,
        });
        const obj = await Category.getCategory(result[0]);
        return res.status(200).json({ data: obj[0] });
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
        const result = await Category.getCategory(req.body.id);
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
        const result = await Category.getAllCategories();
        return res.status(200).json({ data: result });
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
        const result = await Category.deleteCategory(id);
        return res.status(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/update", async (req, res) => {
    try {
        if (!req.body.categoryname || !req.body.id) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Category.updateCategory(req.body.id, { catname: req.body.categoryname });
        return res.status(200).json({ data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

module.exports = app;
