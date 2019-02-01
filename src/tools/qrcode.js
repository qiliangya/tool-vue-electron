const qrcode = require('qrcode')
const request = require('request')

const enQrcode = function (msg) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(msg, function (err, url) {
      if (err) throw err
      resolve(url)
    })
  })
}

// 解析二维码
const deQrcode = function (img) {
  return new Promise((resolve, reject) => {
    request.post('https://cli.im/apis/up/deqrimg',
      { form: { img } },
      function (err, res, body) {
        if (err) throw err
        resolve(body)
      }
    )
  })
}

module.exports = {
  enQrcode,
  deQrcode
}
