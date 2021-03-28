const { contextBridge, ipcRenderer } = require('electron');

const interopList = require('./interop');

const bridge = {};

for (const [interopName, interop] of Object.entries(interopList)) {
  bridge[interopName] = {};
  for(const [handlerName, _] of Object.entries(interop)) {
    const invoker = `${interopName}.${handlerName}`;
    bridge[interopName][handlerName] = (...args) => ipcRenderer.invoke(invoker, ...args);
  }
}

contextBridge.exposeInMainWorld('Interop', bridge);