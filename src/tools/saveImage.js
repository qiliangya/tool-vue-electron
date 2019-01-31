const fs = require('fs')
const path = require('path')
const SAVE_IMAGE_URL = path.resolve('./', 'static', 'images')

const saveImage = function (url) {
  return new Promise((resolve, reject) => {
    fs.stat(SAVE_IMAGE_URL, (err, status) => {
      if (err) {
        fs.mkdir(SAVE_IMAGE_URL, err => {
          if (err) throw err
          writeFile(url, resolve)
        })
      } else {
        writeFile(url, resolve)
      }
    })
  })
}

const writeFile = function (url, resolve) {
  const base64Data = url.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')

  const tempImagePath = path.resolve(SAVE_IMAGE_URL, new Date().getTime() + '.png')

  fs.writeFile(tempImagePath, dataBuffer, err => {
    if (err) throw err
    resolve(tempImagePath)
  })
}

module.exports = {
  saveImage
}
