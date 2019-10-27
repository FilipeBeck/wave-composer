import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let window!: BrowserWindow

app.on('ready', launchInfo => {
	window = new BrowserWindow({
		darkTheme: true,
		show: false,
		// width: 500,
		// height: 750,
		// resizable: false,
		// icon: path.join(__dirname, '../images/app-icon/png/64x64.png')
		webPreferences: {
			nodeIntegration: true
		}
	})
	// Carrega o app
	window.loadURL(url.format({
		pathname: path.join(__dirname, '../index.html'),
		protocol: 'file',
		slashes: true
	}))
	// Exibe apenas quando estiver pronto
	window.once('ready-to-show', () => {
		// window.webContents.openDevTools()
		window.maximize()
		window.show()
	})
})