const ElectronPlugin = require('./electron-plugin');

const path = require('path');

const entry = {
    app: path.join(__dirname, 'src/main.js'),       
};

module.exports = {
  filenameHashing: false,
  publicPath: '.',
  chainWebpack: config => config.optimization.delete('splitChunks'),
  configureWebpack: {
    plugins: [ElectronPlugin],
    entry
  }
};

