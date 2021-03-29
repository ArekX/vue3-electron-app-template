# vue3-electron-app-template

Using Electron 12+ with electron-forge and pure Vue 3 (no vuex or any addtional libs installed).

Vue 3 Electron App Template

Everything in `electron` folder is code for Electron JS code. Everything in `src` is Vue code.

Watching and rebuild script was done using pure vue.config.js changes with webpack hooks and 
without having to override any part of vue cli service or electron's code.
So this should be compatible with vue 3 or electron upgrades.

## Installation

1. Run `npm install`

## Usage

Electron app will reload if code changes in `src` or `electron` folder.

1. Run `npm run serve`

## Building and packaging

1. Run `npm run build`

## Development

### Consderations

1. Keep all app state inside vue. Use node features only through electron ipcRenderer and ipcMain. This will allow for Vue side with hot reload to function correctly and electron side to function as expected.
2. You want to watch for files or folders outside `electron` folder you will need to add them into `"watch"` inside
`"electronPlugin"` inside `package.json`.
3. If you need to ignore files from electron watch please add them in `"ignore"` in `"electronPlugin"`.
4. In case some node modules do not copy correctly during building for production, reason can be due to `electron-packager` pruning too many files and not recongnizing that some files or node modules are necessary. In order to mitigate this you can add node modules you want to do a full copy (no pruning at all) by specifying their folder names in `"fullCopyModules"` in `"electronPlugin"`.
5. Electron forge build configuration is located inside `forge.config.js`.
6. Assets should not start with `/`. This will work fine in `npm run serve` because it runs a webpack server in background but it won't work in `npm run build`.

### Interop

In order to expose functions for Vue to talk to electron's process you will need to add a file inside `interop` folder and add it in `index.js` with a name you want. Currently there is `dialog.js` which is exposed as `window.Interop.dialog` in Vue.

Inside Vue you only need to call `window.Interop.nameExposedInIndexJs.function()`. All functions return promises so you can use async/await to handle that.

This code is all inside `electron` folder so if your workflow differs then you can just use your own workflow with your own custom electron code.

### Pages

Switching between pages is provided by `navigation` library inside `src` folder. There is no Vue router because it is not necessary as this is a GUI app and not a web application. 

All pages should be created inside `pages` folder and exposed for navigation inside `pages/index.js`. When a page is exposed in `pages/index.js` it becomes available in navigation as `navigation.goTo('ComponentName')`.

See `src/state/navigation` for function support.

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
