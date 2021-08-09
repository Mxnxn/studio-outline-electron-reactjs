const { app, BrowserWindow } = require("electron");
const Tables = require("../data/tables");
const express = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");
const path = require("path");
const log4js = require("log4js");
const expressLogging = require("express-logging");
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
            daysToKeep: 2,
            keepFileExt: true,
        },
    },
    categories: {
        default: { appenders: ["console", "dateFile"], level: "error" },
    },
});
let logger = log4js.getLogger();
express.use(expressLogging(logger));
express.use(cors());
express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());

let mainWindow;

express.get("/test", (req, res) => {
    return res.status(200).json({ message: "Test" });
});
const ClientRoute = require("../data/Routes/Client");
const EntryRoute = require("../data/Routes/Entry");
const CategoryRoute = require("../data/Routes/Category");
const SubcategoryRoute = require("../data/Routes/Subcategory");
const ProductRoute = require("../data/Routes/Product");
const ExcelRoute = require("../data/Routes/Excel");
const AuthRoute = require("../data/Routes/Auth");

express.use("/excel", ExcelRoute);
express.use("/client", ClientRoute);
express.use("/entry", EntryRoute);
express.use("/category", CategoryRoute);
express.use("/Subcategory", SubcategoryRoute);
express.use("/product", ProductRoute);
express.use("/auth", AuthRoute);
express.get("/exit", (req, res) => {
    mainWindow.close();
    return res.status(200).json({ code: 200, message: "Exited" });
});
express.get("/minimize", (req, res) => {
    mainWindow.minimize();
    return res.status(200).json({ code: 200, message: "Exited" });
});

const server = express.listen(3001, () => {
    console.log("Server has started on 3001");
});
// to close server
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 860,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            // devTools: false,
        },
    });
    console.log(__dirname);
    createTables();
    let startUrl = url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file:",
        slashes: true,
    });
    // // mainWindow.removeMenu();
    // mainWindow.webContents.openDevTools();
    mainWindow.focus();
    mainWindow.loadURL(startUrl);
    mainWindow.focus();
}

const createTables = () => {
    Tables.createClient();
    Tables.createCategory();
    Tables.createProduct();
    Tables.createEntry();
    Tables.createSubcategory();
    Tables.createClientDetails();
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
