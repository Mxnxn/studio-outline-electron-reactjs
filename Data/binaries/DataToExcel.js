const Excel = require("exceljs");
var fs = require("fs");
class DTE {
    constructor(name) {
        console.log("[+] Generating Excelsheet Has Started!");
        this.workbook = new Excel.Workbook();
        this.worksheet = this.workbook.addWorksheet("ExampleSheet");
        this.createHeader(name);
        this.createColumnHead();
        // To Add blank space between rows
        // this.addBlankRow(6);
        // For Category
    }

    createHeader(name) {
        //Client Details Row
        this.mergeCellWithBorder("A1", "Y3", "center", `Client Name:${name.clientname} \n Site Name:${name.sitename}`);
        // Date, Cost Row
        this.mergeCellWithBorder("A4", "I4", "left", `Date: `);
        this.mergeCellWithBorder("J4", "L4", "left", "");
        this.mergeCellWithBorder("M4", "P4", "center", "Cost");
        this.mergeCellWithBorder("Q4", "Y4", "center", "");
    }

    createCategory(row, object, toAddBlankRow) {
        if (!toAddBlankRow) this.addBlankRow(row - 1);
        this.mergeCellWithBorderAndFill(`A${row}`, `P${row}`, "left", object.catname);
        this.mergeCellWithBorderAndFill(`Q${row}`, `R${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(`S${row}`, `T${row}`, "left", object.total - object.cpaid);
        this.mergeCellWithBorderAndFill(`U${row}`, `V${row}`, "left", object.total);
        this.mergeCellWithBorderAndFill(`W${row}`, `Y${row}`, "left", "");
    }

    createSubcategory(row, object) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", `${object.index})`, true);
        this.mergeCellWithBorderAndFill(`B${row}`, `P${row}`, "left", object.subcatname);
        this.mergeCellWithBorderAndFill(`Q${row}`, `R${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(`S${row}`, `T${row}`, "left", object.total - object.cpaid);
        this.mergeCellWithBorderAndFill(`U${row}`, `V${row}`, "left", object.total);
        this.mergeCellWithBorderAndFill(`W${row}`, `Y${row}`, "left", "");
    }

    addEntry(row, object) {
        this.singleCellWithBorder(`A${row}`, "left", `${object.index}`, false);
        this.mergeCellWithBorder(`B${row}`, `I${row}`, "left", object.description, false);
        this.singleCellWithBorder(`J${row}`, "left", `${object.length}x${object.height}`, false);
        this.mergeCellWithBorder(`K${row}`, `L${row}`, "left", "default", false);
        this.mergeCellWithBorder(`M${row}`, `N${row}`, "left", object.mrate, false);
        this.mergeCellWithBorder(`O${row}`, `P${row}`, "left", object.lrate, false);
        this.mergeCellWithBorder(`Q${row}`, `R${row}`, "left", object.cpaid, false);
        this.mergeCellWithBorder(`S${row}`, `T${row}`, "left", object.total - object.cpaid, false);
        this.mergeCellWithBorder(`U${row}`, `V${row}`, "left", object.total, false);
        this.mergeCellWithBorder(`W${row}`, `Y${row}`, "left", "-", false);
    }

    // Creates ColumnHead Rows
    createColumnHead() {
        this.singleCellWithBorder("A5", "left", "Sr", true);
        this.mergeCellWithBorder("B5", "I5", "left", "Description", true);
        this.singleCellWithBorder("J5", "left", "Qty", true);
        this.mergeCellWithBorder("K5", "L5", "left", "Measurement Type", true);
        this.mergeCellWithBorder("M5", "N5", "left", "Material Rate", true);
        this.mergeCellWithBorder("O5", "P5", "left", "Labour Rate", true);
        this.mergeCellWithBorder("Q5", "R5", "left", "Current Paid", true);
        this.mergeCellWithBorder("S5", "T5", "left", "Due Amount", true);
        this.mergeCellWithBorder("U5", "V5", "left", "Total", true);
        this.mergeCellWithBorder("W5", "Y5", "left", "Notes", true);
    }

    addBlankRow(row) {
        this.singleCellWithBorder(`A${row}`, "left", "");
        this.mergeCellWithBorder(`B${row}`, `I${row}`, "left", "");
        this.singleCellWithBorder(`J${row}`, "left", "");
        this.mergeCellWithBorder(`K${row}`, `L${row}`, "left", "");
        this.mergeCellWithBorder(`M${row}`, `N${row}`, "left", "");
        this.mergeCellWithBorder(`O${row}`, `P${row}`, "left", "");
        this.mergeCellWithBorder(`Q${row}`, `R${row}`, "left", "");
        this.mergeCellWithBorder(`S${row}`, `T${row}`, "left", "");
        this.mergeCellWithBorder(`U${row}`, `V${row}`, "left", "");
        this.mergeCellWithBorder(`W${row}`, `Y${row}`, "left", "");
    }

    singleCellWithBorder(cell, align, value, bold) {
        this.worksheet.getCell(cell).value = value;
        this.worksheet.getCell(cell).border = {
            top: { style: "thin", color: { argb: "3f3f3f00" } },
            left: { style: "thin", color: { argb: "3f3f3f00" } },
            bottom: { style: "thin", color: { argb: "3f3f3f00" } },
            right: { style: "thin", color: { argb: "3f3f3f00" } },
        };
        if (bold) {
            this.worksheet.getCell(cell).font = {
                bold: true,
            };
        }
        if (align === "center") {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "center" };
        } else if (align === "left") {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "left" };
        } else {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "right" };
        }
    }

    singleCellWithBorderAndFill(cell, align, value, bold) {
        this.worksheet.getCell(cell).value = value;
        this.worksheet.getCell(cell).border = {
            top: { style: "thin", color: { argb: "3f3f3f00" } },
            left: { style: "thin", color: { argb: "3f3f3f00" } },
            bottom: { style: "thin", color: { argb: "3f3f3f00" } },
            right: { style: "thin", color: { argb: "3f3f3f00" } },
        };
        if (bold) {
            this.worksheet.getCell(cell).font = {
                bold: true,
            };
        }
        this.worksheet.getCell(cell).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "00dfdfdf" },
        };
        if (align === "center") {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "center" };
        } else if (align === "left") {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "left" };
        } else {
            this.worksheet.getCell(cell).alignment = { vertical: "middle", horizontal: "right" };
        }
    }

    mergeCellWithBorder(start, end, align, value, bold) {
        this.worksheet.getCell(start).value = value;
        this.worksheet.mergeCells(`${start}:${end}`);
        this.worksheet.getCell(start).border = {
            top: { style: "thin", color: { argb: "3f3f3f00" } },
            left: { style: "thin", color: { argb: "3f3f3f00" } },
            bottom: { style: "thin", color: { argb: "3f3f3f00" } },
            right: { style: "thin", color: { argb: "3f3f3f00" } },
        };
        if (bold) {
            this.worksheet.getCell(start).font = {
                bold: true,
            };
        }
        if (align === "center") {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "center" };
        } else if (align === "left") {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "left" };
        } else {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "right" };
        }
    }

    mergeCellWithBorderAndFill(start, end, align, value) {
        this.worksheet.getCell(start).value = value;
        this.worksheet.getCell(start).font = {
            bold: true,
        };
        this.worksheet.mergeCells(`${start}:${end}`);
        this.worksheet.getCell(start).border = {
            top: { style: "thin", color: { argb: "3f3f3f00" } },
            left: { style: "thin", color: { argb: "3f3f3f00" } },
            bottom: { style: "thin", color: { argb: "3f3f3f00" } },
            right: { style: "thin", color: { argb: "3f3f3f00" } },
        };
        this.worksheet.getCell(start).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "00dfdfdf" },
        };
        if (align === "center") {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "center" };
        } else if (align === "left") {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "left" };
        } else {
            this.worksheet.getCell(start).alignment = { vertical: "middle", horizontal: "right" };
        }
    }

    async exportToExcel(name) {
        try {
            if (!fs.existsSync("./exports")) {
                fs.mkdirSync("./exports");
            }
            await this.workbook.xlsx.writeFile(`./exports/${name}.xlsx`);
            console.log("[+] Generated.xlsx Has Generated Successfully!");
        } catch (error) {
            console.log(error);
            return error.errno;
        }
    }
}

module.exports = DTE;
