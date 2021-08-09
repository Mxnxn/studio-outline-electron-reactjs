const jwt = require("jsonwebtoken");
const app = require("express").Router();

app.use("/*", (req, res, next) => next());

app.post("/verify", async (req, res) => {
    try {
        const result = jwt.verify(req.body.token, "u]s$5dBDax-n2!a>K**r!!@");
        return res.json({ code: 200, data: result, msg: "Successfully Verified" });
    } catch (error) {
        return res.json({ code: 401, data: error.message, msg: "Unauthorized/Expired!" });
    }
});
module.exports = app;
