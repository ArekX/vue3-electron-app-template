# vue3-electron-app-template

Using Electron 12+ with electron-forge and pure Vue 3 (no vuex or any addtional libs installed).

Vue 3 Electron App Template

Everything in `electron` folder is code for Electron JS code. Everything in `src` is Vue code.

Images and other assets must be inside `assets` folder and referenced using `/path/to/image.jpg`.

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


## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
