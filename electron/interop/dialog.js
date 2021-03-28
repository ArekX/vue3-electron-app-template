const { dialog } = require('electron');

module.exports = {
	async openDialog() {
		return dialog.showOpenDialog({ properties: ['openFile'] });
	}
}