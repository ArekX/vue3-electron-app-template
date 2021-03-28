const electron = require('electron');
const child_process = require('child_process');
const chokidar = require('chokidar');

const config = require("./package.json");

const fs = require('fs');
const path = require('path');
let reloading = false;
let child = null;

module.exports = {
  apply(compiler) {
    if (!compiler.hooks || !compiler.hooks.done) {
        return;
    }

    if (process.argv[2] === 'serve') {
        hookOnServeMode(compiler);
    } else if (process.argv[2] === 'build') {
        hookOnBuildMode(compiler);
    }
  }
};

function reloadElectron() {
    if (child) {
        reloading = true;
        child.kill('SIGKILL');
    }

    child = child_process.spawn(electron, ['./electron/index.js', '--development'], { stdio: 'inherit' });
    child.on('close', code => {
        if (!reloading) {
            process.exit(code);
        }
        reloading = false;
    });
}


function hookOnServeMode(compiler) {
    let ready = false;
    compiler.hooks.done.tap('ElectronPlugin', () => {
        if (!ready) {
            reloadElectron();
            ready = true;
        }
    });

    const ignoreFiles = config.electronPlugin.ignore || [];

    chokidar.watch(config.electronPlugin.watch).on('all', (event, fullPath) => {
        if (ignoreFiles.includes(path.basename(fullPath))) {
            return;
        }
        
        console.log("[ElectronPlugin] Reloading due to change in:", fullPath);
        ready && reloadElectron();
    });
}

function hookOnBuildMode(compiler) {
    compiler.hooks.done.tap('ElectronPlugin', () => {
        const htmlPath = path.join(__dirname, 'dist/index.html');
        const cssPath = path.join(__dirname, 'dist/css/app.css');


        console.log('[ElectronPlugin] Rewriting asset paths on index.html')
        fs.writeFileSync(htmlPath, fs.readFileSync(htmlPath).toString().replace(/(src|href)="\//g, '$1="'));

        console.log('[ElectronPlugin] Rewriting asset paths on app.css')
        fs.writeFileSync(cssPath, fs.readFileSync(cssPath).toString().replace(/url\(\//g, 'url(..\/'));
    });
}