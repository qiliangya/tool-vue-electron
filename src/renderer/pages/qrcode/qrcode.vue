<template>
  <div class="qrcode">
    <div class="qrcode-input">
        二维码内容：
        <Row>
          <Col span="10">
            <Input suffix="ios-barcode" placeholder="输入要生成的内容" size="large" clearable v-model="qrcodeData" />
          </Col>
          <Col span="3" offset="1">
            <Button type="info" size="large" @click="startQrcode">生成</Button>
          </Col>
        </Row>
        <Row v-if="imgData">
          <Col span="14">
            <img :src="imgData" @contextmenu="onRightMenu($event)" id="qrcode"/>
          </Col>
        </Row>
        <right-menu :showMenu="showRightMenu" :menuList="menuList" :point="point"/>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, clipboard, nativeImage } from 'electron'
import rightMenu from '../../components/RightMenu/RightMenu'
export default {
  data () {
    return {
      qrcodeData: '',
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
    startQrcode () {
      ipcRenderer.send('qrcode', this.qrcodeData)
    },
    onRightMenu (e) {
      this.showRightMenu = true
      this.point[0] = e.clientX
      this.point[1] = e.clientY
    }
  },
  created () {
    ipcRenderer.on('getQrcode', (e, data) => {
      this.imgData = data
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
      font-size:16px;
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
