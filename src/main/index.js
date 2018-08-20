import { app, BrowserWindow } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

app.on('ready', () => {
  let window = new BrowserWindow({
     width: 1400, 
     height: 900,
     title: "Stockvueer 2.0 iex",
     show: false
    })
  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    window.webContents.openDevTools()
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  window.once('ready-to-show', () => {
    window.show()
  })
  window.on("closed", () => {
    window = null;
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})