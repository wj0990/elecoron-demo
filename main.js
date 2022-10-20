const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const dockMenu = require('./dockMenu');
const { Http2ServerRequest } = require('http2');
const https = require('https');
const fs = require('fs');

// 添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
const createwindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegrationInWorker: true // 多线程
    }
  })

  ipcMain.handle = ('ping', () => 'pong')

  // 加载 index.html
  mainWindow.loadFile('index.html');

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}
const iconName = path.join(__dirname, 'iconForDragAndDrop.png');
const icon = fs.createWriteStream(iconName);

fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  console.log('------responseresponse--->', response)
  response.pipe(icon);
})
// 调用createWindow()函数来打开您的窗口。
app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu);
  }
}).then(createwindow);

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName,
  })
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createwindow();
  }
})
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.qiut()
})