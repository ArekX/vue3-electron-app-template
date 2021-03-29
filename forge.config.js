const fs = require('fs');
const path = require('path');
const package = require('./package.json');

module.exports = {
    packagerConfig: {
        target: "portable",
        asar: false,
        ignore: [
            "src",
            "public",
            "babel.config.js",
            "dependencies.js",
            "electron-plugin.js",
            "node_modules/.bin",
            "node_modules/.cache",
            "vue.config.js",
            "forge.config.js"
        ]
    },
    hooks: {
        packageAfterPrune(config, appPath) {
            const modules = package.electronPlugin.fullCopyModules;

            for(const module of modules) {
                console.log("- Full copying a module:", module);
                const source = path.join(__dirname, 'node_modules', module);
                const destination = path.join(appPath, 'node_modules');

                copyFolderRecursive(source, destination);
            }
        }
    },
    makers: [
        {
          name: "@electron-forge/maker-squirrel",
          config: {
            name: "app_name"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
    ]
};


function copyFolderRecursive(source, target) {
    const targetFolder = path.join(target, path.basename(source));

    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        for(const file of files) {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursive(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        }
    }

    function copyFileSync(source, target) {

        let targetFile = target;

        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }

        fs.copyFileSync(source, targetFile);
    }
}

