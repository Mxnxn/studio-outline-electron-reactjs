const app = require("express").Router();
const Excel = require("../binaries/DataToExcel");
const { getLogger } = require("log4js");
// const logger = getLogger("dataFile");
const path = require("path");
const { shell } = require("electron");

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
        let row = 8;
        let total = 0;
        let cpaid = 0;
        let endRow = 0;
        for (let index = 0; index < req.body.rows.length; index++) {
            let category = req.body.rows[index];
            total += category.total;
            cpaid += category.cpaid;
            Obj.createCategory(row, category, true);
            row += 1;
            Obj.createRowForBlankOther(row);
            row += 1;
            for (let sindex = 0; sindex < category.subcategories.length; sindex++) {
                let subcat = category.subcategories[sindex];
                if (subcat.subcatname == "OTHERS" && category.catname == "CARPENTARY WORK") {
                    Obj.createRowForOthers(row, sindex + 1);
                    row += 1;
                } else if (subcat.subcatname != "OTHERS") {
                    Obj.createSubcategory(row, { ...subcat, index: sindex + 1 });
                    row += 1;
                }
                for (let eindex = 0; eindex < subcat.entries.length; eindex++) {
                    const entry = subcat.entries[eindex];
                    Obj.addEntry(row, { ...entry, index: eindex + 1 });
                    row += 1;
                    if (eindex === subcat.entries.length - 1) {
                        Obj.createRowForBlankOther(row);
                        row += 1;
                    }
                }
            }
            endRow = row;
        }
        Obj.createCategory(endRow, { catname: "TOTAL:", cpaid: cpaid, total: total }, true);
        endRow += 1;
        Obj.longNoteSingleRow(endRow, "NOTE:", true);
        Obj.longNotesWithIndex(endRow + 1, { value: "Estimate will be vary on the selection basis that might be a 10% variation", index: "1)" }, true);
        Obj.longNotesWithIndex(
            endRow + 2,
            {
                value: "Payment term includes 50% advance,45% on middle of the project and 5% after completion of project",
                index: "2)",
            },
            true
        );
        Obj.longNotesWithIndex(endRow + 3, { value: "10% of Each floor rise to drop the material to the site will charge extra.", index: "3)" }, true);
        Obj.longNotes(
            endRow + 4,
            "THIS FILE IS THE PROPERTY OF STUDIO OUTLINE - INTERIOR DESIGNERS & MUST BE RETURNED ON REQUEST. IT IS SUBMITED AS CONFIDENTIAL INFORMATION IN CONNECTION WITH THE ENQUIRY, TENDER OR CONTRACT. IT IS NOT BE USED FOR ANY OTHER PURPOSES OR NOR MAY IT BE COPIED OR LENT WITHOUT OUR AUTHORITY IN WRITING.",
            true
        );
        const lol = await Obj.exportToExcel(`${req.body.clientname}_${req.body.sitename}`);
        if (lol === -4082) {
            // logger.error(" /excel/generate EXCEL FILE IS BUSY!");
            return res.status(500).json({ code: "BUSY", message: "Please close sheet to overwrite!!" });
        }
        await shell.showItemInFolder(path.join(__dirname, `../../exports/${req.body.clientname}_${req.body.sitename}.xlsx`));

        return res.status(200).json({
            code: "SUCCESS",
            message: "DONE",
            path: path.join(__dirname, `../../exports/${req.body.clientname}_${req.body.sitename}.xlsx`),
        });
    } catch (error) {
        console.log(error);
        // logger.error("Something went wrong!");
        return res.status(500).json({ code: "INTERNAL", message: "Something went wrong!" });
    }
});

module.exports = app;
