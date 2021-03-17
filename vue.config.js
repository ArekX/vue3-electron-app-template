const isDev = process.argv[3] === '--development';

const ElectronPlugin = require('./electron-plugin');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const entry = {
    app: path.join(__dirname, 'src/main.js'),       
};

if (isDev) {
    entry.electron = path.join(__dirname, 'index.js');
}

module.exports = {
  configureWebpack: {
    plugins: [
    	ElectronPlugin
	],
    entry
  },
  chainWebpack: config => {
  	if (isDev) {
  		config.plugins.delete('preload');
  	}
    config
        .plugin('html')
        .tap(args => {
            args[0].excludeChunks = ['electron'];
            return args;
        })
	}
};

