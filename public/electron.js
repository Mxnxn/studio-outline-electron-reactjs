const { app, BrowserWindow } = require("electron");
const Tables = require("../data/tables");
const express = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");
const path = require("path");

log4js.configure({
    appenders: {
        console: {
            type: "stdout",
            layout: { type: "colored" },
        },
        dateFile: {
            type: "dateFile",
            filename: `./logs/api.log`,
            layout: { type: "basic" },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true,
        },
    },
    categories: {
        default: { appenders: ["console", "dateFile"], level: "info" },
    },
});
let logger = log4js.getLogger();
let lg = log4js.getLogger("dateFile");
express.use(expressLogging(logger));
express.use(cors());
express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());

express.get("/test", (req, res) => {
    return res.status(200).json({ message: "Test" });
});
const ClientRoute = require("../data/Routes/Client");
const EntryRoute = require("../data/Routes/Entry");
const CategoryRoute = require("../data/Routes/Category");
const SubcategoryRoute = require("../data/Routes/Subcategory");
const ProductRoute = require("../data/Routes/Product");
const ExcelRoute = require("../data/Routes/Excel");

express.use("/excel", ExcelRoute);
express.use("/client", ClientRoute);
express.use("/entry", EntryRoute);
express.use("/category", CategoryRoute);
express.use("/Subcategory", SubcategoryRoute);
express.use("/product", ProductRoute);

const server = express.listen(3001, () => {
    console.log("Server has started on 3001");
});
// to close server
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 860,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    createTables();
    let startUrl = url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file:",
        slashes: true,
    });
    mainWindow.loadURL(startUrl);
}

const createTables = () => {
    Tables.createClient();
    Tables.createCategory();
    Tables.createProduct();
    Tables.createEntry();
    Tables.createSubcategory();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    app.quit();
    server.close();
});