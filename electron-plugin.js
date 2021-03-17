const electron = require('electron');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const isDev = process.argv[3] === '--development';

const electronIndex = path.join(__dirname, 'index.js');

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


function hookOnServeMode(compiler) {
    let reloading = false;
    let child = null;


    compiler.hooks.compilation.tap('ElectronPlugin', (compilation) => {
        compilation.hooks.additionalAssets.tap('ElectronPlugin', () => {
            delete compilation.assets['js/electron.js'];
        });
    });


    compiler.hooks.emit.tap('ElectronPlugin', (compilation) => {
        delete compilation.assets['js/electron.js'];
    });

    compiler.hooks.done.tap('ElectronPlugin', () => {
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
    });
}

function hookOnBuildMode(compiler) {
    compiler.hooks.done.tap('ElectronPlugin', () => {
        const htmlPath = path.join(__dirname, 'dist/index.html');
        const source = fs.readFileSync(htmlPath).toString();

        fs.writeFileSync(htmlPath, source.replace(/(src|href)="\//g, '$1="'));
    });
}