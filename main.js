// main.js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Modules to control application life and create native browser window
const { app, BrowserWindow, protocol, net} = require('electron')
const adblocker_electron_1 = require("@cliqz/adblocker-electron");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const fs_1 = require("fs");
const url = require('node:url')
const path = require('node:path')

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'atom',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
    },
  },
]);


async function createWindow() {  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: __dirname + '/insanity.png',
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //webviewTag: true,
      additionalArguments: [`--customValue=${__dirname}`]

    }
  })




  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  mainWindow.loadURL('https://soundcloud.com');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  const blocker = await adblocker_electron_1.ElectronBlocker.fromLists(cross_fetch_1.default, adblocker_electron_1.fullLists, {
    enableCompression: true,
  }, {
    path: 'engine.bin',
    read: async (...args) => (0, fs_1.readFileSync)(...args),
                                                                       write: async (...args) => (0, fs_1.writeFileSync)(...args),
  });
  blocker.enableBlockingInSession(mainWindow.webContents.session);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  protocol.handle('atom', (request) => {
    const filePath = request.url.slice('atom://'.length)
    console.log(filePath);

    return net.fetch(`file:///${filePath}`);
    //return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
  })
  createWindow()

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

