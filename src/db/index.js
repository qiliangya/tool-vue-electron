const { app } = require('electron')
const Datastore = require('nedb')
const path = require('path')
const userDataPath = app.getPath('userData')
function initDB (pathName) {
  return new Datastore({
    filename: path.join(userDataPath, pathName + '.db'),
    autoload: true
  })
}

export const cssDB = initDB('css')
export const userDB = initDB('user')

export default {
  cssDB,
  userDB
}
