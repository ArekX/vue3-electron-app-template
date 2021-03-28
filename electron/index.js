const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const interops = require('./interop');

for (const [interopName, interop] of Object.entries(interops)) {
  for (const [name, handler] of Object.entries(interop)) {
    ipcMain.handle(interopName + '.' + name, handler);
  }
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  });

  const development = process.argv?.[2] === '--development';

  if (development) {
     win.webContents.openDevTools();
     win.loadURL('http://localhost:8080');
  } else {
     win.loadFile('dist/index.html');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});