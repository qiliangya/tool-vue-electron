const IpcProcess = require('./ipcProcess')
const { app } = require('electron')
const Datastore = require('nedb')
const userDataPath = app.getPath('userData')
const path = require('path')

class DbTools {
  constructor (pathName) {
    this.pathName = pathName
    this.default = this.init()
  }
  init () {
    return new Datastore({
      filename: path.join(userDataPath, '/path/', this.pathName + '.db'),
      autoload: true
    })
  }
  insert (data) {
    return new Promise((resolve, reject) => {
      this.default.insert(data, (err, newDoc) => {
        if (err) throw new Error(err)
        resolve(newDoc)
      })
    })
  }
  find (data) {
    return new Promise((resolve, reject) => {
      this.default.find(data, (err, newDoc) => {
        if (err) throw new Error(err)
        resolve(newDoc)
      })
    })
  }
  update (oldData, newData) {
    return new Promise((resolve, reject) => {
      this.default.update(oldData, newData, {}, (err, newDoc) => {
        if (err) throw new Error(err)
        resolve(newDoc)
      })
    })
  }
  remove (data) {
    return new Promise((resolve, reject) => {
      this.default.remove(data, {}, (err, newDoc) => {
        if (err) throw new Error(err)
        resolve(newDoc)
      })
    })
  }
}

class Nedb extends IpcProcess {
  constructor () {
    super()
    this.cssDB = new DbTools('css')
    this.userDB = new DbTools('user')
  }
}

const NedbInstance = new Nedb()

// 存数据
NedbInstance.on('insertData', (e, payload) => {
  const { name, data } = payload
  NedbInstance[name].insert(data).then(res => {
    e.sender.send('getInsertData', res)
  })
})

// 查数据
NedbInstance.on('findData', (e, payload) => {
  const { name, data } = payload
  NedbInstance[name].find(data).then(res => {
    e.sender.send('getFindData', res)
  })
})

// 改数据
NedbInstance.on('updateData', (e, payload) => {
  const { name, data } = payload
  NedbInstance[name].update(data.oldData, data.newData, {}).then(res => {
    e.sender.send('getUpdateData', res)
  })
})

// 删除数据
NedbInstance.on('removeData', (e, payload) => {
  const { name, data } = payload
  NedbInstance[name].remove(data, {}).then(res => {
    e.sender.send('getRemoveData', res)
  })
})
