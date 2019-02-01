import { saveImage } from '../tools/saveImage'
const IpcProcess = require('./ipcProcess')

class SaveImage extends IpcProcess {}

new SaveImage().on('saveImage', (e, base64Url) => {
  saveImage(base64Url).then(data => {
    e.sender.send('getImageStatus', data)
  })
})
