const app = require("express").Router();
const Product = require("../api/products");
app.use("/*", (req, res, next) => next());
app.post("/add", async (req, res) => {
    try {
        if (!req.body.productname || !req.body.mrate || !req.body.lrate) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Product.addProduct({
            pname: req.body.productname,
            mrate: req.body.mrate,
            lrate: req.body.lrate,
        });
        const obj = await Product.getProduct(result[0]);
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
        const result = await Product.getProduct(req.body.id);
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
        const result = await Product.getAllProducts();
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
        await Product.deleteProduct(req.body.id);
        return res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});

app.post("/update", async (req, res) => {
    try {
        if (!req.body.productname || !req.body.mrate || !req.body.lrate || !req.body.id) {
            return res.status(200).json({
                message: "Invalid Request",
                status: false,
            });
        }
        const result = await Product.updateProduct(req.body.id, {
            pname: req.body.productname,
            mrate: req.body.mrate,
            lrate: req.body.lrate,
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
