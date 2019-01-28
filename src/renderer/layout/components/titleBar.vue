<template>
  <div class="title-bar main-bg">
    <p>{{$route.meta.title}}</p>
    <ul>
      <li @click="mini">
        <img :src="require('../../assets/img/small.png')" alt="最小化"/>
      </li>
      <li @click="max">
        <img :src="isLarge ? require('../../assets/img/large-s.png') : require('../../assets/img/large.png')" :alt="isLarge ? '缩小' : '放大'"/>
      </li>
      <li @click="close">
        <img :src="require('../../assets/img/close.png')" alt="关闭"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      isLarge: false
    }
  },
  methods: {
    mini () {
      ipcRenderer.send('min')
    },
    max () {
      if (this.isLarge) {
        ipcRenderer.send('unMax')
      } else {
        ipcRenderer.send('max')
      }
      this.isLarge = !this.isLarge
    },
    close () {
      ipcRenderer.send('close')
    }
  }
}
</script>

<style scoped lang="scss">
  .title-bar{
    position: fixed;
    width:100%;
    top:0;
    left:0;
    height:40px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    border-radius: 10px 10px 0 0;
    -webkit-app-region:drag;
    line-height:40px;
    * {
      -webkit-app-region:no-drag;
    }
    p{
      font-size:14px;
      line-height:40px;
      color:#fff;  
    }
    ul{
      display:flex;
      justify-content: space-between;
      li{
        margin-right:10px;
        width: 20px;
        height:20px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
</style>
