<template>
  <ul class="right-menu" v-if="showMenu" :style="{left: point[0] + 'px',top: point[1] + 'px'}">
    <li v-for="(item, index) in menuList" :key="index" @click="item.control">{{item.text}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: []
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    point: {
      type: Array,
      default: [0, 0]
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-menu{
    position: fixed;
    z-index:1000;
    width:100px;
    line-height:20px;
    border: 1px solid #fff;
    font-size:14px;
    li{
      height:20px;
      padding: 0 10px;
      border-bottom:1px solid #fff;
      background-color:#fff;
      transition: .3s;
      cursor: pointer;
      color:#5cadff;
      &:hover{
        background-color:#5cadff;
        color:#fff;
      }
      &:last-child{
        border:none;
      }
    }
  }
</style>
