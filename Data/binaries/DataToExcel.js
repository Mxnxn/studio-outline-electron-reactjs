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
    let mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return `${dd}-${mm}-${yy}`;
};

class DTE {
    constructor(name) {
        console.log("[+] Generating Excelsheet Has Started!");
        this.workbook = new Excel.Workbook();
        this.worksheet = this.workbook.addWorksheet("ExampleSheet");
        this.worksheet.views = [{}];
        this.createHeader(name, "", getDate());
        this.createColumnHead(6);
    }

    createLeftHeader() {
        this.mergeCellWithBorder("A1", "I3", "left", `STUDIO OUTLINE`);
        this.worksheet.getCell("A1").font = {
            size: 36,
            bold: true,
        };
        this.mergeCellWithBorder("A4", "I4", "left", `Email : outline891@gmail.com`);
        this.mergeCellWithBorder("A5", "I5", "left", `Phone : +91 8401527637`);
    }

    createHeader(name, cphone, date) {
        this.createLeftHeader();
        this.mergeCellWithBorder("J1", "S1", "left", `QUOTATION`);
        this.mergeCellWithBorder("J2", "S2", "left", `Date : ${date}`);
        this.mergeCellWithBorder("J3", "S3", "left", `Name : ${name.clientname}`);
        this.mergeCellWithBorder("J4", "S4", "left", `Address :${name.sitename}`);
        this.mergeCellWithBorder("J5", "S5", "left", `Studio Outline GSTIN: 24ADDFS8077K1ZL`);
    }

    longNotesWithIndex(row, object) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", object.index);
        this.mergeCellWithBorderAndFill(`B${row}`, `S${row}`, "left", object.value);
    }

    longNoteSingleRow(row, value) {
        this.mergeCellWithBorderAndFill(`A${row}`, `S${row}`, "left", value);
        this.worksheet.getCell(`A${row}`).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    }

    longNotes(row, value) {
        this.mergeCellWithBorderAndFill(`A${row}`, `S${row + 2}`, "left", value);
        this.worksheet.getCell(`A${row}`).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    }

    createCategory(row, object, toAddBlankRow) {
        if (!toAddBlankRow) this.addBlankRow(row - 1);
        this.mergeCellWithBorderAndFill(`A${row}`, `M${row}`, "left", object.catname);
        this.mergeCellWithBorderAndFill(`N${row}`, `O${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(
            `P${row}`,
            `Q${row}`,
            "left",
            object.total === "" ? "" : object.total - object.cpaid
        );
        this.mergeCellWithBorderAndFill(`R${row}`, `S${row}`, "left", object.total);
        this.worksheet.getCell(`A${row}`).font = {
            size: 14,
            bold: true,
        };
        this.worksheet.getCell(`N${row}`).font = {
            size: 14,
            bold: true,
        };
        this.worksheet.getCell(`P${row}`).font = {
            size: 14,
            bold: true,
        };
        this.worksheet.getCell(`R${row}`).font = {
            size: 14,
            bold: true,
        };
    }

    createSubcategory(row, object) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", object.index === "" ? "" : `${chars[object.index]})`, true);
        this.mergeCellWithBorderAndFill(`B${row}`, `M${row}`, "left", object.subcatname);
        this.mergeCellWithBorderAndFill(`N${row}`, `O${row}`, "left", object.cpaid);
        this.mergeCellWithBorderAndFill(
            `P${row}`,
            `Q${row}`,
            "left",
            object.total === "" ? "" : object.total - object.cpaid
        );
        this.mergeCellWithBorderAndFill(`R${row}`, `S${row}`, "left", object.total);
        this.worksheet.getCell(`A${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`B${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`N${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`P${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`R${row}`).font = {
            size: 12,
            bold: true,
        };
    }

    createRowForOthers(row, index) {
        this.singleCellWithBorderAndFill(`A${row}`, "left", `${chars[index]})`, true);
        this.mergeCellWithBorderAndFill(`B${row}`, `M${row}`, "left", "OTHERS");
        this.mergeCellWithBorderAndFill(`N${row}`, `O${row}`, "left", "");
        this.mergeCellWithBorderAndFill(`P${row}`, `Q${row}`, "left", "");
        this.mergeCellWithBorderAndFill(`R${row}`, `S${row}`, "left", "");
        this.worksheet.getCell(`A${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`B${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`N${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`P${row}`).font = {
            size: 12,
            bold: true,
        };
        this.worksheet.getCell(`R${row}`).font = {
            size: 12,
            bold: true,
        };
    }
    createRowForBlankOther(row) {
        this.singleCellWithBorder(`A${row}`, "left", "", true);
        this.mergeCellWithBorder(`B${row}`, `M${row}`, "left", "");
        this.mergeCellWithBorder(`N${row}`, `O${row}`, "left", "");
        this.mergeCellWithBorder(`P${row}`, `Q${row}`, "left", "");
        this.mergeCellWithBorder(`R${row}`, `S${row}`, "left", "");
    }

    addEntry(row, object) {
        this.singleCellWithBorder(`A${row}`, "left", Number(object.index), false);
        if (object.description.length > 60) {
            // this.worksheet.getCell(`B${row}`).alignment = { wrapText: true };
            // this.worksheet.properties.defaultRowHeight = 15;
        }
        this.mergeCellWithBorder(`B${row}`, `G${row}`, "left", object.description, false);

        this.singleCellWithBorder(`H${row}`, "left", Number(object.qty), false);
        this.singleCellWithBorder(`I${row}`, "left", `${object.type}`, false);
        this.mergeCellWithBorder(`J${row}`, `K${row}`, "left", object.mrate === 0 ? "-" : object.mrate, false);
        this.mergeCellWithBorder(`L${row}`, `M${row}`, "left", object.lrate === 0 ? "-" : object.lrate, false);
        this.mergeCellWithBorder(`N${row}`, `O${row}`, "left", object.cpaid, false);
        this.mergeCellWithBorder(`P${row}`, `Q${row}`, "left", object.total - object.cpaid, false);
        this.mergeCellWithBorder(`R${row}`, `S${row}`, "left", object.total, false);
    }

    // Creates ColumnHead Rows
    createColumnHead(row) {
        this.singleCellWithBorder(`A${row}`, "left", "Sr.", true);
        this.mergeCellWithBorder(`B${row}`, `G${row}`, "left", "Description", true);
        this.singleCellWithBorder(`H${row}`, "left", "Qty", true);
        this.singleCellWithBorder(`I${row}`, "left", "Type", true);
        this.mergeCellWithBorder(`J${row}`, `K${row}`, "left", "Material Rate", true);
        this.mergeCellWithBorder(`L${row}`, `M${row}`, "left", "Labour Rate", true);
        this.mergeCellWithBorder(`N${row}`, `O${row}`, "left", "Current Paid", true);
        this.mergeCellWithBorder(`P${row}`, `Q${row}`, "left", "Due Amount", true);
        this.mergeCellWithBorder(`R${row}`, `S${row}`, "left", "Total", true);
    }

    addBlankRow(row) {
        this.singleCellWithBorder(`A${row}`, "left", "");
        this.mergeCellWithBorder(`B${row}`, `G${row}`, "left", "");
        this.singleCellWithBorder(`H${row}`, "left", "");
        this.singleCellWithBorder(`I${row}`, "left", "");
        this.mergeCellWithBorder(`J${row}`, `K${row}`, "left", "");
        this.mergeCellWithBorder(`L${row}`, `M${row}`, "left", "");
        this.mergeCellWithBorder(`N${row}`, `O${row}`, "left", "");
        this.mergeCellWithBorder(`P${row}`, `Q${row}`, "left", "");
        this.mergeCellWithBorder(`R${row}`, `S${row}`, "left", "");
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
