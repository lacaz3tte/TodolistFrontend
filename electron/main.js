const { app, BrowserWindow } = require('electron')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    icon: './public/favicon.ico',
  })
  win.loadURL('http://localhost:3000')
}
app.whenReady().then(() => {
  createWindow()
})

