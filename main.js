const { app, BrowserWindow } = require('electron');

// 添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
const createwindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html');
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
// 监听 app 模块的 'window-all-closed' 事件。如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.qiut()
})