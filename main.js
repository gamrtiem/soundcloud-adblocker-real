// main.js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const adblocker_electron_1 = require("@cliqz/adblocker-electron");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const fs_1 = require("fs");



async function createWindow() {  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      webSecurity: false, //scary !
      additionalArguments: [`--customValue=${path.join(__dirname, 'main.css')}`, `--customValue=${path.join(__dirname, 'soundcloudShuffleLikes.js')}`],
    }
  })

  const blocker = await adblocker_electron_1.ElectronBlocker.fromLists(cross_fetch_1.default, adblocker_electron_1.fullLists, {
    enableCompression: true,
  }, {
    path: 'engine.bin',
    read: async (...args) => (0, fs_1.readFileSync)(...args),
                                                                       write: async (...args) => (0, fs_1.writeFileSync)(...args),
  });
  blocker.enableBlockingInSession(mainWindow.webContents.session);


  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  mainWindow.loadURL('https://soundcloud.com');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

