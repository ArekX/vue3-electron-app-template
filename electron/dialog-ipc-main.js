const { dialog, ipcMain } = require('electron');

ipcMain.handle('open-dialog', async () => {
	return dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
});