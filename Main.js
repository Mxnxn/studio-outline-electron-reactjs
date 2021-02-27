const { app, BrowserWindow } = require("electron");
const Tables = require("./Data/tables");
const express = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
express.use(cors());
express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());
// to close server
let handle;
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 860,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Checking and Creating tables in sqlite3
    Tables.createClient();
    Tables.createCategory();
    Tables.createProduct();
    Tables.createEntry();
    Tables.createSubcategory();

    // Routes
    const ClientRoute = require("./Routes/Client");
    const EntryRoute = require("./Routes/Entry");
    const CategoryRoute = require("./Routes/Category");
    const SubcategoryRoute = require("./Routes/Subcategory");
    const ProductRoute = require("./Routes/Product");

    // Assigning Routes
    express.use("/client", ClientRoute);
    express.use("/entry", EntryRoute);
    express.use("/category", CategoryRoute);
    express.use("/Subcategory", SubcategoryRoute);
    express.use("/product", ProductRoute);

    handle = express.listen(3001);
    mainWindow.loadURL("http://localhost:3000");
}

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
    if (process.platform !== "darwin") app.quit();
    handle.close();
});
