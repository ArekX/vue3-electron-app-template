const { app, BrowserWindow } = require('electron');
const path = require('path');

require('./dialog-ipc-main.js');

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'integrate.js')
    }

  });

  const development = process.argv?.[2] === '--development';

  if (development) {
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