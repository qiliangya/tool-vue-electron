import { ipcMain } from 'electron'
class IpcProcess {
  constructor () {
    this.ipcMain = ipcMain
  }

  on (eventName, callback) {
    this.ipcMain.on(eventName, callback)
  }
}

module.exports = IpcProcess
