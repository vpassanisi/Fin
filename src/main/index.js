import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import Reload from "./reload.js";
import Store from "electron-store";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Reload(__dirname);

const store = new Store();

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const isDevelopment = process.env.NODE_ENV !== "production";

function createWindow() {
  const win = new BrowserWindow({
    height: 745,
    width: 1280,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.setMenuBarVisibility(false);

  if (isDevelopment) {
    win.webContents.openDevTools();
    win.loadFile(path.join(__dirname, "index.html"));
  } else {
    win.removeMenu();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC listener
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (event, key, val) => {
  store.set(key, val);
});
