// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// const { ipcRenderer } = require('electron')

const { ipcRenderer } = require("electron");


setTimeout(() => {
	document.getElementById("test123").addEventListener('click', () => {
		console.log(ipcRenderer);
		ipcRenderer.send('click');
	});
}, 10000);
