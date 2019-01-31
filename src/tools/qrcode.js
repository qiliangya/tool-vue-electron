const qrcode = require('qrcode')

const createQrcode = function (msg) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(msg, function (err, url) {
      if (err) throw err
      resolve(url)
    })
  })
}

module.exports = {
  createQrcode
}
