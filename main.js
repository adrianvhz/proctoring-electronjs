const { app, BrowserWindow, shell, ipcMain, dialog, desktopCapturer, globalShortcut, Menu, MenuItem } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
// 	app.quit();
// }

const createWindow = () => {
	const win = new BrowserWindow({
		// width: 800,
		// height: 600,
		// alwaysOnTop: true,
		// kiosk: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			// webviewTag: true,
			nodeIntegration: true,
			// contextIsolation: false,
			
			// nativeWindowOpen: true
		},
		// title: "PROEDUCATIVE",
		icon: path.join(__dirname, "assets/logo.ico"),
		autoHideMenuBar: true
	});
	// win.on("blur", (evt) => {
	// 	console.log("blur");
	// 	win.show();
	// });
	// win.on("close", (evt) => {
	// 	console.log("close");
	// 	evt.preventDefault();
	// })
	win.maximize();
	// win.show();

	// win.loadURL("http://plugins-devdigitalcloud.com");
	win.loadURL("https://mensajeria.devdigitalcloud.com/admin/monitoreo");
	// win.loadFile('index.html');

	win.webContents.openDevTools();

	win.webContents.on("will-attach-webview", function(evt, a, b) {
		console.log("before");
		b.allowpopups = true;
		b.disablewebsecurity = true;
	});

	// win.webContents.setWindowOpenHandler(({ url }) => {
	// 	console.log('URL:', url);
	// 	if (url !== 'about:blank') {
	// 	  return {
	// 		action: 'allow',
	// 		overrideBrowserWindowOptions: {
	// 		//   frame: false,
	// 		  fullscreenable: false,
	// 		  backgroundColor: 'black',
	// 		  webPreferences: {
				
	// 			// preload: 'my-child-window-preload-script.js'
	// 		  }
	// 		}
	// 	  }
	// 	}
	// 	return { action: 'deny' }
	// });

	// shell.openExternal("https://google.com");
}

app.whenReady().then(() => {
	createWindow();
	// globalShortcut.register("Super+Tab", () => {
	// 	console.log("win+R is pressed: Shortcut Disabled");
	// });
});

// app.on('browser-window-blur', (event, bw) => {
    // bw.restore();
    // bw.focus();
// });

// app.on('browser-window-focus', function () {
//     globalShortcut.register("R", () => {
//         console.log("win+R is pressed: Shortcut Disabled");
//     });
//     globalShortcut.register("F5", () => {
//         console.log("F5 is pressed: Shortcut Disabled");
//     });
// 	globalShortcut.register("Alt+Tab", () => {
// 		console.log("Alt+F is pressed: Shorcut Disabled");
// 	})
// });
// app.on('browser-window-blur', function () {
//     globalShortcut.unregister('R');
//     globalShortcut.unregister('F5');
// 	globalShortcut.unregisterAll("Alt+Tab")
// });



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/* app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
}); */

/* app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
}); */























/* app.on('web-contents-created', (e, contents) => {
	// Check for a webview
	if (contents.getType() == 'webview') {
  
	  // Listen for any new window events
	  contents.on('new-window', (e, url) => {
		e.preventDefault()
		shell.openExternal(url)
	  })
	}
}); */


ipcMain.handle('getSources', async () => {
	return await desktopCapturer.getSources({ types: ['window', 'screen'] })
});

ipcMain.handle('showSaveDialog', async () => {
	return await dialog.showSaveDialog({
		buttonLabel: 'Save video',
		defaultPath: `vid-${Date.now()}.webm`
	});
});

ipcMain.handle('getOperatingSystem', () => {
	return process.platform;
});
