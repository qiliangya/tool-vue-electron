<template>
  <div class="qrcode">
    <div class="qrcode-input" v-if="isEnCode">
        <Button type="info" @click="isEnCode = !isEnCode">我想解析</Button>
        <h3>生成二维码：</h3>
        <Row>
          <Col span="10">
            <Input suffix="ios-barcode" placeholder="输入要生成的内容" size="large" clearable v-model="qrcodeData" />
          </Col>
          <Col span="3" offset="1">
            <Button type="info" size="large" @click="enQrcode">生成</Button>
          </Col>
        </Row>
        <Row v-if="imgData">
          <Col span="14">
            <img :src="imgData" @contextmenu="onRightMenu($event)" id="qrcode"/>
          </Col>
        </Row>
        <right-menu :showMenu="showRightMenu" :menuList="menuList" :point="point"/>
    </div>
    <div class="qrcode-upload" v-else style="margin-top:50px;">
      <Button type="info" @click="isEnCode = !isEnCode">我想生成</Button>
      <h3>解析二维码</h3>
      <p v-if="qrcodeText">您解析的二维码为: <span>{{qrcodeText}}</span></p>
      <Upload
          multiple
          type="drag"
          :on-success="uploadImg"
          name="Filedata"
          action="https://upload.api.cli.im/upload.php?kid=cliim">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>请上传你要解析的二维码</p>
          </div>
      </Upload>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, clipboard, nativeImage } from 'electron'
import rightMenu from '../../components/RightMenu/RightMenu'
export default {
  data () {
    return {
      isEnCode: true,
      qrcodeData: '',
      qrcodeText: '',
      imgData: '',
      showRightMenu: false,
      point: [],
      menuList: [
        {
          text: '保存图片',
          control: () => {
            ipcRenderer.send('saveImage', this.imgData)
          }
        },
        {
          text: '保存base64',
          control: () => {
            clipboard.writeText(this.imgData)
          }
        }
      ]
    }
  },
  components: {
    rightMenu
  },
  methods: {
    uploadImg (response, file, fileList) {
      this.deQrcode(response.data.path)
    },
    enQrcode () {
      ipcRenderer.send('enQrcode', this.qrcodeData)
    },
    deQrcode (imgPath) {
      ipcRenderer.send('deQrcode', imgPath)
    },
    onRightMenu (e) {
      this.showRightMenu = true
      this.point[0] = e.clientX
      this.point[1] = e.clientY
    }
  },
  created () {
    ipcRenderer.on('getEnQrcode', (e, data) => {
      this.imgData = data
    })
    ipcRenderer.on('getDeQrcode', (e, data) => {
      this.qrcodeText = JSON.parse(data).info.data[0]
    })
    ipcRenderer.on('getImageStatus', (e, data) => {
      const image = nativeImage.createFromPath(data)
      clipboard.writeImage(image)
    })
    document.onclick = () => {
      this.showRightMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .qrcode{
    width:100%;
    height:100%;
    padding: 0 50px;
    .qrcode-input{
      height:60px;
      margin-top:50px;
    }
    img{
      width:200px;
      height:200px;
      border:1px solid #999;
      padding: 0px;
      margin-top:30px;
    }
  }
</style>
