const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

// 通过预加载脚本从渲染器访问Node.js。

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerHTML = text;
  }
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
})
contextBridge.exposeInMainWorld('versions', {
  ping: () => ipcRenderer.invoke('ping')
})
contextBridge.exposeInMainWorld('electron', {
  startDarg: (fileName) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})