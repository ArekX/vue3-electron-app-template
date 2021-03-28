const ElectronPlugin = require('./electron-plugin');
const path = require('path');

const entry = {
    app: path.join(__dirname, 'src/main.js'),       
};

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [ElectronPlugin],
    entry
  }
};

