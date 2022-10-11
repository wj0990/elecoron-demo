const path = require('path');
const { app, BrowserWindow } = require('electron');

// 添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
const createwindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 加载 index.html
  mainWindow.loadFile('index.html');

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}
// 调用createWindow()函数来打开您的窗口。
app.whenReady().then(() => {
  createwindow()
  // 没有窗口打开则打开一个窗口 
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createwindow();
    }
  })
})
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.qiut()
})