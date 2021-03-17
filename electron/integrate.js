const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('MainApp', {
  openDialog: () => {
      return ipcRenderer.invoke('open-dialog');
  }
})