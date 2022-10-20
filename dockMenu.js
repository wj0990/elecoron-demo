const { app, BrowserWindow, Menu } = require('electron');

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click() { console.log('New window') }
  }, {
    label: 'New window',
    click() {
      console.log('New Window')
    }
  }, {
    label: 'New window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

module.exports = dockMenu;