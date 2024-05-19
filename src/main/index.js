"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require('fs');
require("electron-reload")(path.join(__dirname));

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const isDevelopment = process.env.NODE_ENV !== "production";

function createWindow() {
  const win = new BrowserWindow({
    height: 745,
    width: 1280,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
  }
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

// IPC listener to handle file write
ipcMain.on('write-to-file', (event, arg) => {
  const { filePath, content } = arg;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      event.reply('write-to-file-res', { success: false, message: err.message });
    } else {
      event.reply('write-to-file-res', { success: true, message: 'File written successfully!' });
    }
  });
});

ipcMain.on('read-from-disk', (event, arg) => {
  try {
    const data = fs.readFileSync(arg, 'utf8');
    const jsonData = JSON.parse(data);
    event.reply('read-from-disk-res', { success: true, message: 'File read successfully', data: jsonData })
  } catch (err) {
    event.reply('read-from-disk-res', { success: false, message: err})
  }
})