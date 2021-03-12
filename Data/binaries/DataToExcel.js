const Excel = require("exceljs");
var fs = require("fs");
let chars = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
};

const getDate = () => {
    let date = new Date();
    let yy = date.getFullYear();
    let mm = date.getMonth() < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
    let dd = date.getDate() < 10 ? "0" + date.getDate() + 1 : date.getDate() + 1;

    return `${dd}-${mm}-${yy}`;
};

class DTE {
    constructor(name) {
        console.log("[+] Generating Excelsheet Has Started!");
        this.workbook = new Excel.Workbook();
        this.worksheet = this.workbook.addWorksheet("ExampleSheet");
        this.createHeader(name, "", getDate());
        this.createColumnHead(7);
        // To Add blank space between rows
        // this.addBlankRow(6);
        // For Category
    }

    createLeftHeader() {
        this.mergeCellWithBorder("A1", "J3", "center", `STUDIO OUTLINE`);
        this.worksheet.getCell("A1").font = {
            size: 36,
            bold: true,
        };
        this.mergeCellWithBorder("A4", "J4", "center", `Email : outline891@gmail.com`);
        this.mergeCellWithBorder("A5", "J5", "center", `Phone : +91 8401527637`);
    }

    createHeader(name, address, cphone, date) {
        this.createLeftHeader();
        this.mergeCellWithBorder("K1", "Y1", "center", `QUOTATION`);
        this.mergeCellWithBorder("K2", "Y2", "center", `Date : ${date}`);
        this.mergeCellWithBorder("K3", "Y3", "center", `Name : ${name.clientname}`);
        this.mergeCellWithBorder("K4", "Y4", "center", `Address :${name.sitename}`);
        this.mergeCellWithBorder("K5", "Y5", "center", `Phone : ${cphone}`);
    }

    longNotesWithIndex(row, object) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", object.index);
        this.mergeCellWithBorderAndFill(`B${row}`, `Y${row}`, "left", object.value);
    }

    longNotes(row, value) {
        this.mergeCellWithBorderAndFill(`A${row}`, `Y${row + 2}`, "left", value);
        this.worksheet.getCell(`A${row}`).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    }

    createCategory(row, object, toAddBlankRow) {
        if (!toAddBlankRow) this.addBlankRow(row - 1);
        this.mergeCellWithBorderAndFill(`A${row}`, `P${row}`, "left", object.catname);
        this.mergeCellWithBorderAndFill(`Q${row}`, `R${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(
            `S${row}`,
            `T${row}`,
            "left",
            object.total === "" ? "" : object.total - object.cpaid
        );
        this.mergeCellWithBorderAndFill(`U${row}`, `V${row}`, "left", object.total);
        this.mergeCellWithBorderAndFill(`W${row}`, `Y${row}`, "left", "");
        this.worksheet.getCell(`A${row}`).font = {
            size: 14,
            bold: true,
        };
    }

    createSubcategory(row, object) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", object.index === "" ? "" : `${chars[object.index]})`, true);
        this.mergeCellWithBorderAndFill(`B${row}`, `P${row}`, "left", object.subcatname);
        this.mergeCellWithBorderAndFill(`Q${row}`, `R${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(
            `S${row}`,
            `T${row}`,
            "left",
            object.total === "" ? "" : object.total - object.cpaid
        );
        this.mergeCellWithBorderAndFill(`U${row}`, `V${row}`, "left", object.total);
        this.mergeCellWithBorderAndFill(`W${row}`, `Y${row}`, "left", "");
        this.worksheet.getCell(`A${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`B${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`Q${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`S${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`U${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`W${row}`).font = {
            size: 12,
            bold: true,
        };
    }

    createRowForOthers(row, object) {
        this.singleCellWithBorder(`A${row}`, "left", "", true);
        this.mergeCellWithBorder(`B${row}`, `P${row}`, "left", "");
        this.mergeCellWithBorder(`Q${row}`, `R${row}`, "left", "");
        this.mergeCellWithBorder(`S${row}`, `T${row}`, "left", "");
        this.mergeCellWithBorder(`U${row}`, `V${row}`, "left", "");
        this.mergeCellWithBorder(`W${row}`, `Y${row}`, "left", "");
    }

    addEntry(row, object) {
        this.singleCellWithBorder(`A${row}`, "left", `${object.index}`, false);
        this.mergeCellWithBorder(`B${row}`, `I${row}`, "left", object.description, false);
        this.singleCellWithBorder(`J${row}`, "left", `${object.qty}`, false);
        console.log(object.type);
        this.mergeCellWithBorder(`K${row}`, `L${row}`, "left", `${object.type}`, false);
        this.mergeCellWithBorder(`M${row}`, `N${row}`, "left", object.mrate === 0 ? "-" : object.mrate, false);
        this.mergeCellWithBorder(`O${row}`, `P${row}`, "left", object.lrate === 0 ? "-" : object.lrate, false);
        this.mergeCellWithBorder(`Q${row}`, `R${row}`, "left", object.cpaid, false);
        this.mergeCellWithBorder(`S${row}`, `T${row}`, "left", object.total - object.cpaid, false);
        this.mergeCellWithBorder(`U${row}`, `V${row}`, "left", object.total, false);
        this.mergeCellWithBorder(`W${row}`, `Y${row}`, "left", "-", false);
    }

    // Creates ColumnHead Rows
    createColumnHead() {
        this.singleCellWithBorder("A6", "left", "Sr", true);
        this.mergeCellWithBorder("B6", "I6", "left", "Description", true);
        this.singleCellWithBorder("J6", "left", "Qty", true);
        this.mergeCellWithBorder("K6", "L6", "left", "Measurement Type", true);
        this.mergeCellWithBorder("M6", "N6", "left", "Material Rate", true);
        this.mergeCellWithBorder("O6", "P6", "left", "Labour Rate", true);
        this.mergeCellWithBorder("Q6", "R6", "left", "Current Paid", true);
        this.mergeCellWithBorder("S6", "T6", "left", "Due Amount", true);
        this.mergeCellWithBorder("U6", "V6", "left", "Total", true);
        this.mergeCellWithBorder("W6", "Y6", "left", "Notes", true);
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
