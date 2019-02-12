const Datastore = require('nedb')
const path = require('path')

function initDB (pathName) {
  return new Datastore({
    filename: path.resolve(__dirname, './path/' + pathName + '.db'),
    autoload: true
  })
}

export const cssDB = initDB('css')
export const userDB = initDB('user')

export default {
  cssDB,
  userDB
}
