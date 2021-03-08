const app = require("express").Router();
const Excel = require("../binaries/DataToExcel");
const { getLogger } = require("log4js");
const logger = getLogger("dataFile");
const path = require("path");
app.use("/*", (req, res, next) => next());

app.get("/test", (req, res) => {
    const Obj = new Excel();
    Obj.exportToExcel("TAMOE");
    return res.status(200).json({ message: "DONE" });
});
app.post("/generate", async (req, res) => {
    try {
        if (!req.body.clientname || !req.body.sitename || !req.body.rows) {
            return res.status(400).json({ message: "Invalid request!" });
        }
        const Obj = new Excel({ clientname: req.body.clientname, sitename: req.body.sitename });
        let row = 7;
        let total = 0;
        let cpaid = 0;
        let endRow = 0;
        for (let index = 0; index < req.body.rows.length; index++) {
            const category = req.body.rows[index];
            total += category.total;
            cpaid += category.cpaid;
            Obj.createCategory(row, category);
            row += 1;
            for (let sindex = 0; sindex < category.subcategories.length; sindex++) {
                const subcat = category.subcategories[sindex];
                Obj.createSubcategory(row, { ...subcat, index: sindex + 1 });
                row += 1;
                for (let eindex = 0; eindex < subcat.entries.length; eindex++) {
                    const entry = subcat.entries[eindex];
                    Obj.addEntry(row, { ...entry, index: eindex + 1 });
                    row += 1;
                    if (eindex === subcat.entries.length - 1) {
                        row += 1;
                    }
                }
            }
            endRow = row;
        }
        Obj.createCategory(endRow, { catname: "TOTAL:", cpaid: cpaid, total: total });
        endRow += 1;
        Obj.createCategory(endRow, { catname: "NOTE:", cpaid: "", total: "" }, true);
        const lol = await Obj.exportToExcel(`${req.body.clientname}_${req.body.sitename}`);
        if (lol === -4082) {
            logger.error(" /excel/generate EXCEL FILE IS BUSY!");
            return res.status(500).json({ code: "BUSY", message: "Please close sheet to overwrite!!" });
        }
        return res.status(200).json({
            code: "SUCCESS",
            message: "DONE",
            path: path.join(__dirname, `../exports/${req.body.clientname}_${req.body.sitename}.xlsx`),
        });
    } catch (error) {
        console.log(error);
        logger.error("Something went wrong!");
        return res.status(500).json({ code: "INTERNAL", message: "Something went wrong!" });
    }
});

module.exports = app;
