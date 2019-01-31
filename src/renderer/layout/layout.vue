<template>
  <div class="layout">
    <title-bar/>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import titleBar from './components/titleBar'
export default {
  components: {
    titleBar
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    padding-top:40px;
    width:100%;
    height:100%;
    box-shadow: 0 0px 5px gray;
  }
  #content{
    border-radius: 0 0 10px 10px;
    position: relative;
    height:100%;
  }
</style>
