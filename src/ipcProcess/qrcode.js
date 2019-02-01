import { enQrcode, deQrcode } from '../tools/qrcode'
const IpcProcess = require('./ipcProcess')

class Qrcode extends IpcProcess {}

const qrcodeInstance = new Qrcode()

// 编码
qrcodeInstance.on('enQrcode', (e, msg) => {
  enQrcode(msg).then(data => {
    e.sender.send('getEnQrcode', data)
  })
})

// 解码
qrcodeInstance.on('deQrcode', (e, img) => {
  deQrcode(img).then(data => {
    e.sender.send('getDeQrcode', data)
  })
})
